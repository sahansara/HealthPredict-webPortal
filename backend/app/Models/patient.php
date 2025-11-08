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

    protected $fillable = ['full_name', 'date_of_birth', 'gender', 'address', 'phone', 'age', 'password', 'profile_picture','role_id','national_id', 'email'];
    //hidden attributes for response
    protected $hidden = [
        'password',
        'remember_token',
    ];
    //hash password
    protected $casts = [
        'password' => 'hashed',
        'email_verified_at' => 'datetime',
    ];

 

    //auto appedn json respond
    protected $appends=['profile_picture_url'];

    //get full URL for profile image

    public function getProfilePictureUrlAttribute()
    {
        //chek image emty or not 
        if(!$this->profile_picture){
            return null;
    }
    //check alrady full url if is ,return it 

    if(filter_var($this->profile_picture, FILTER_VALIDATE_URL)){
        return $this->profile_picture;
    }
     //return absoulte url

     return asset('storage/' . $this->profile_picture);
}


    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_patient')
                    ->belongsToMany(sys_role::class)
                    ->withPivot(['assigned_at','is_primary','status'])
                    ->withTimestamps();
    }
}
