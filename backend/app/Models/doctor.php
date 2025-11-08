<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Doctor extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;
    
    protected $fillable = [
        'dr_id',
        'full_name',
        'email',
        'phone',
        'address',
        'profile_picture',
        'specialization',
        'password',
        'role_id'
    ];
    



     // Automatically append this to JSON responses
    protected $appends = ['profile_picture_url'];
    
    /**
     * Get the full URL for the profile picture
     */
    public function getProfilePictureUrlAttribute()
    {
        if (!$this->profile_picture) {
            return null;
        }
        
        // If already a full URL, return as is
        if (filter_var($this->profile_picture, FILTER_VALIDATE_URL)) {
            return $this->profile_picture;
        }
        
        // Generate full URL
        return asset('storage/' . $this->profile_picture);
    }


    
    // Hidden attributes for response
    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    // Password hashing
    protected $casts = [
        'password' => 'hashed',
        'email_verified_at' => 'datetime',
    ];


    
    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'doctor_patient')
                    ->belongsToMany(sys_role::class)
                    ->withPivot(['assigned_at', 'is_primary', 'status'])
                    ->withTimestamps();
    }


}