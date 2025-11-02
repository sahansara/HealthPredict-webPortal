<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('doctor_patient', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('doctors')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->timestamp('assigned_at')->nullable()->useCurrent();
            $table->boolean('is_primary')->default(false); 
            $table->string('status')->default('active');   
            $table->timestamps();
            $table->unique(['doctor_id', 'patient_id']); 
            $table->index('doctor_id');
            $table->index('patient_id');
        });
    }

    public function down(): void {
        Schema::dropIfExists('doctor_patient');
    }
};
