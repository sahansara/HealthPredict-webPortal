<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('national_id')->unique();
             $table->foreignId('role_id')->constrained('role')->onDelete('cascade');
            $table->string('full_name');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('address');
            $table->string('phone');
            $table->string('age');
            $table->string('password');
           
            $table->string('profile_picture')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
        
    }
};
