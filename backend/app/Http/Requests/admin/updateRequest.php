<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;

class updateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        \Log::info('Update request received with input: ', [
            'input' => $this->except('profile_picture'),
            'has_file' => $this->hasFile('profile_picture'),
            'route_id' => $id
        ]);

        return [
            // Validate only when present for updates
            'full_name'       => 'sometimes|required|string|max:255',
            'email'           => ['sometimes','required','email', Rule::unique('doctors','email')->ignore($id)],
            'phone'           => 'sometimes|required|string|digits:10',
            'address'         => 'sometimes|required|string',
            'profile_picture' => 'sometimes|file|image|mimes:jpeg,png,jpg|max:2048',
            'specialization'  => 'sometimes|required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name cannot be empty.',
            'full_name.string' => 'Full name must be text.',
            'full_name.max'    => 'Full name may not be greater than 255 characters.',

            'email.required' => 'Email cannot be empty.',
            'email.email'  => 'Enter a valid email address.',
            'email.unique' => 'This email is already taken.',

            'phone.required' => 'Phone cannot be empty.',
            'phone.digits' => 'Phone must be exactly 10 digits.',
            'phone.digits' => 'Phone must be exactly 10 digits.',
            'address.required' => 'Address cannot be empty.',
            'address.string' => 'Address must be text.',

            'profile_picture.file' => 'Profile picture must be a file.',
            'profile_picture.image' => 'Profile picture must be an image.',
            'profile_picture.mimes' => 'Profile picture must be a file of type: jpeg, png, jpg.',
            'profile_picture.max'   => 'Profile picture may not be greater than 2MB.',

            'specialization.required' => 'Specialization cannot be empty.',
            'specialization.filled' => 'Specialization cannot be empty.',
            'specialization.string' => 'Specialization must be text.',
            'specialization.max'    => 'Specialization may not be greater than 255 characters.',
        ];
    }


    public function attributes(): array
    {
        return [
            'full_name'       => 'Full name',
            'email'           => 'Email',
            'phone'           => 'Phone',
            'address'         => 'Address',
            'profile_picture' => 'Profile picture',
            'specialization'  => 'Specialization',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        // Ensure at least one field is present
        $validator->after(function ($validator) {
            $payload = $this->only([
                'full_name','email','phone','address','profile_picture','specialization'
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
