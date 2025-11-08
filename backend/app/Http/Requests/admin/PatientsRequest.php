<?php

namespace App\Http\Requests\Admin;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

use Illuminate\Foundation\Http\FormRequest;

class PatientsRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'national_id' => 'required|string|max:255|unique:patients,national_id',
            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|string|in:male,female,other',
            'address' => 'required|string|max:500',
            'phone' => 'required|string|max:20',
            'age' => 'required|string|max:3',
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:role,id',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => 'required|email|max:255|unique:patients,email',
        ];
    }

    public function messages(): array
    {
        return [
            'national_id.required' => 'National ID is required',
            'national_id.unique' => 'This National ID is already registered',
            'full_name.required' => 'Patient name is required',
            'date_of_birth.required' => 'Date of birth is required',
            'date_of_birth.before' => 'Date of birth must be before today',
            'gender.required' => 'Gender is required',
            'gender.in' => 'Gender must be male, female, or other',
            'address.required' => 'Address is required',
            'phone.required' => 'Phone number is required',
            'age.required' => 'Age is required',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'role_id.required' => 'Role is required',
            'role_id.exists' => 'Selected role does not exist',
            'email.required' => 'Email is required',
            'email.email' => 'Please provide a valid email address',
            'email.unique' => 'This email is already registered',
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
