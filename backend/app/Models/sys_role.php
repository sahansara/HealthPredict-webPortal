<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class sys_role extends Model
{
    protected $table = 'role';

    protected $fillable = [
        'name',
    ];


    public function users()
    {
        return $this->hasMany(User::class);
    }
}
