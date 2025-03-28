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
    Schema::create('appointments', function (Blueprint $table) {
        $table->id();
        $table->date("date")->nullable();
        $table->enum('status', ['pending', 'completed', 'cancelled', 'scheduled','rescheduled'])->default('scheduled');
        $table->string("title")->nullable();
        $table->string("tooth")->nullable();
        $table->text("content")->nullable();
        $table->foreignId('folder_id')->constrained('folders')->onDelete('cascade');
        $table->timestamps();
}); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
