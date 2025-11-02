<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'date_of_birth', 'gender', 'address', 'phone_number', 'age', 'password', 'profile_image','role_id','national_id', 'email'];
    //hidden attributes for response
    protected $hidden = [
        'password',
        'remember_token',
    ];
    //hash password
    protected $casts = [
        'password' => 'hashed',
    ];

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_patient')
                    ->belongsToMany(sys_role::class)
                    ->withPivot(['assigned_at','is_primary','status'])
                    ->withTimestamps();
    }
}
