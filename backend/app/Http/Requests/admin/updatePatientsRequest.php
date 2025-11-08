<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
class updatePatientsRequest extends FormRequest
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
        $id = $this->route('id');

        return [
            'full_name' => 'sometimes|required|string|max:255',
            'date_of_birth' => 'sometimes|required|date|before:today',
            'gender' => 'sometimes|required|in:male,female,other',
            'address' => 'sometimes|required|string|max:500',
            'phone' => 'sometimes|required|string|max:20',
            'age' => 'sometimes|required|integer|min:0|max:150',
            'profile_picture' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'national_id' => ['sometimes', 'required', 'string', 'max:50', Rule::unique('patients', 'national_id')->ignore($id)],
            'email' => ['sometimes', 'required', 'email', Rule::unique('patients', 'email')->ignore($id)],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'The full name field is required.',
            'full_name.max' => 'The full name must not exceed 255 characters.',
            'date_of_birth.required' => 'The date of birth field is required.',
            'date_of_birth.before' => 'The date of birth must be before today.',
            'gender.required' => 'The gender field is required.',
            'gender.in' => 'The gender must be male, female, or other.',
            'address.required' => 'The address field is required.',
            'address.max' => 'The address must not exceed 500 characters.',
            'phone.required' => 'The phone number field is required.',
            'phone.max' => 'The phone number must not exceed 20 characters.',
            'age.required' => 'The age field is required.',
            'age.integer' => 'The age must be a valid number.',
            'age.min' => 'The age must be at least 0.',
            'age.max' => 'The age must not exceed 150.',
            'profile_picture.image' => 'The profile picture must be an image.',
            'profile_picture.mimes' => 'The profile picture must be a file of type: jpeg, png, jpg, gif.',
            'profile_picture.max' => 'The profile picture must not exceed 2MB.',
            'national_id.required' => 'The national ID field is required.',
            'national_id.max' => 'The national ID must not exceed 50 characters.',
            'national_id.unique' => 'This national ID is already registered.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email must not exceed 255 characters.',
            'email.unique' => 'This email is already registered.',
        ];
    }

    public function attributes(): array
    {
        return [
            'full_name' => 'Full Name',
            'date_of_birth' => 'Date of Birth',
            'gender' => 'Gender',
            'address' => 'Address',
            'phone' => 'Phone Number',
            'age' => 'Age',
            'profile_picture' => 'Profile Picture',
            'national_id' => 'National ID',
            'email' => 'Email Address',     
        ];
    }

    public function withValidator(Validator $validator): void
    {
        // Ensure at least one field is present
        $validator->after(function ($validator) {
            $payload = $this->only([
                'full_name',
                'date_of_birth',
                'gender',
                'address',
                'phone',
                'age',
                'profile_picture',
                'national_id',
                'email',
            ]);
            $hasAny = collect($payload)->filter(function ($value) {
                if ($value instanceof \Illuminate\Http\UploadedFile) {
                    return true;
                }
                return !is_null($value) && $value !== '';
            })->isNotEmpty(); 


        
        \Log::info('Payload received for update: ', [
            'payload' => $this->except('profile_picture'),
            'has_file' => $this->hasFile('profile_picture'),
        ]);
        if (!$hasAny) {
            $validator->errors()->add('payload', 'No changes provided. Provide at least one field to update.');
        }
        });
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed. Please correct the errors and try again.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }

}
