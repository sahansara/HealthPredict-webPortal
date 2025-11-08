<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('dr_id')->unique();
            $table->foreignId('role_id')->constrained('role')->onDelete('cascade');
            $table->string('full_name');
           
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
           
            $table->string('profile_picture')->nullable(); 
            $table->string('specialization')->nullable();
            $table->string('password');
             $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('doctors');
    }
};
