<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Http\Requests\Admin\PatientsRequest;
use App\Http\Requests\Admin\updatePatientsRequest;
use Illuminate\Support\Facades\Storage;
class patientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Patient::query();
            
            // Search functionality
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('national_id', 'like', "%{$search}%");
                });
            }
            
            // Filter by gender
            if ($request->has('gender') && $request->gender) {
                $query->where('gender', $request->gender);
            }
            
            $patient = $query->get();
             
            
            return response()->json([
                'success' => true,
                'message' => 'Patients retrieved successfully',
                'data' => $patient
            ], 200);
            
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve patients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PatientsRequest $request)

    {    
        try{
            $validated = $request->validated();
           
            //handle profile image updalod 
            if($request->hasFile('profile_picture')){
                $file=$request->file('profile_picture');
                $fileName='patient-image-' . time() . '.' . $file->getClientOriginalExtension();
                $path=$file->storeAS('patient/profiles',$fileName,'public');

                //store path
                $validated['profile_picture']=$path;

            }

             // Hash password
            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }

            $patient=patient::create($validated);

            return response()->json([
                    'success' => true,
                    'message' => 'patient registered successfully',
                    'data' => $patient
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
                    'message' => 'Failed to register patient',
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
            $patient = Patient::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Patient retrieved successfully',
                'data' => $patient
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
    public function update(updatePatientsRequest $request, string $id)
    {
        try{
            $patient=patient::findOrFail($id);
            $validated=$request->validated();

            //handle profile image updalod
            if($request->hasFile('profile_picture')){

               //delete old image
               if($patient->profile_picture){
                Storage::disk('public')->delete($patient->profile_picture);
               }
                $file=$request->file('profile_picture');
                $fileName='patient-image-' . time() . '.' . $file->getClientOriginalExtension();
                $path=$file->storeAS('patient/profiles',$fileName,'public');

                //store path
                $validated['profile_picture']=$path;

            }

            //update patient info
            $patient->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Patient updated successfully',
                'data' => $patient
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating patient: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update patient',
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
            $patient = Patient::findOrFail($id);

            // Delete profile picture from storage if exists
            if ($patient->profile_picture) {
                Storage::disk('public')->delete($patient->profile_picture);
            }

            $patient->delete();

            return response()->json([
                'success' => true,
                'message' => 'Patient deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete patient',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}
