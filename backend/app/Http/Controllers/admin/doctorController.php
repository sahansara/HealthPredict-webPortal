<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\DocPatientsRequest;
use App\Http\Requests\Admin\UpdateRequest;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    /**
     * Display a listing of all doctors
     */
    public function index(Request $request)
    {
        try {
            $query = Doctor::query();
            
            // Search functionality
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('dr_id', 'like', "%{$search}%");
                });
            }
            
            // Filter by specialization
            if ($request->has('specialization') && $request->specialization) {
                $query->where('specialization', $request->specialization);
            }
            
            $doctors = $query->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Doctors retrieved successfully',
                'data' => $doctors
            ], 200);
            
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve doctors',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DocPatientsRequest $request)
    {
        try {
            $validated = $request->validated();
            
            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                $file = $request->file('profile_picture');
                $fileName = 'doctor-image-' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('doctors/profiles', $fileName, 'public');
                
                //  Store ONLY the path 
                $validated['profile_picture'] = $path;
            }
            
            // Hash password
            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }
            
            $doctor = Doctor::create($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Doctor registered successfully',
                'data' => $doctor
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to register doctor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Doctor retrieved successfully',
                'data' => $doctor
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $validated = $request->validated();

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                // Delete old picture if exists
                if ($doctor->profile_picture) {
                    Storage::disk('public')->delete($doctor->profile_picture);
                }
                
                $file = $request->file('profile_picture');
                $fileName = 'doctor-image-' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('doctors/profiles', $fileName, 'public');
                
                //  Store ONLY the path
                $validated['profile_picture'] = $path;
            }

            // Update doctor details
            $doctor->update($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Doctor details updated successfully',
                'data' => $doctor->fresh()
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Update failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update doctor details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);

            // Delete profile picture from storage if exists
            if ($doctor->profile_picture) {
                Storage::disk('public')->delete($doctor->profile_picture);
            }

            $doctor->delete();

            return response()->json([
                'success' => true,
                'message' => 'Doctor deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete doctor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}