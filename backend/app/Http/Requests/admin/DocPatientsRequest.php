<?php
namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class DocPatientsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'dr_id' => 'required|string|max:255|unique:doctors,dr_id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:doctors,email',
            'phone' => 'required|digits:10',
            'address' => 'required|string',
            'role_id' => 'required|exists:role,id',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'specialization' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ];
    }

    /**
     * Custom error messages
     */
    public function messages(): array
    {
        return [
            'dr_id.required' => 'DR ID is required',
            'dr_id.string' => 'DR ID must be a string',
            'full_name.required' => 'Full name is required',
            'full_name.string' => 'Full name must be a string',
            'full_name.max' => 'Full name must not exceed 255 characters',
            
            'email.required' => 'Email address is required',
            'email.email' => 'Please provide a valid email address',
            'email.unique' => 'This email address is already registered',
            
            'phone.required' => 'Phone number is required',
            'phone.digits' => 'Phone number must be exactly 10 digits',
            
            'address.required' => 'Address is required',
            'address.string' => 'Address must be a string',
            
            'role_id.required' => 'Role is required',
            'role_id.exists' => 'Selected role does not exist',
            
            'specialization.required' => 'Specialization is required',
            'specialization.string' => 'Specialization must be a string',
            'specialization.max' => 'Specialization must not exceed 255 characters',
            
            'password.required' => 'Password is required',
            'password.string' => 'Password must be a string',
            'password.min' => 'Password must be at least 8 characters',
            
            'profile_picture.image' => 'Profile picture must be an image',
            'profile_picture.mimes' => 'Profile picture must be a file of type: jpeg, png, jpg',
            'profile_picture.max' => 'Profile picture size must not exceed 2MB',
        ];
    }

    /**
     * Handle a failed validation attempt - ADDED THIS
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
