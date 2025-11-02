<?php
namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerificationController extends Controller
{
    /**
     * Verify email
     */
    public function verify(Request $request, $id, $hash)
    {
        $doctor = Doctor::findOrFail($id);
        
        // Check if hash matches
        if (!hash_equals((string) $hash, sha1($doctor->getEmailForVerification()))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification link'
            ], 400);
        }
        
        // Check if already verified
        if ($doctor->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email already verified'
            ], 400);
        }
        
        // Mark as verified
        if ($doctor->markEmailAsVerified()) {
            event(new Verified($doctor));
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully! You can now login.'
        ], 200);
    }
    
    /**
     * Resend verification email
     */
    public function resend(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $doctor = Doctor::where('email', $request->email)->first();
        
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found with this email'
            ], 404);
        }
        
        if ($doctor->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email already verified'
            ], 400);
        }
        
        $doctor->sendEmailVerificationNotification();
        
        return response()->json([
            'success' => true,
            'message' => 'Verification email sent successfully'
        ], 200);
    }
}