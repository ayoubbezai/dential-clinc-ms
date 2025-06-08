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
        Schema::create('folder_visits', function (Blueprint $table) {
            $table->id();
            $table->string('dent')->nullable();
            $table->text('reason_of_visit')->nullable();
            $table->text('treatment_details')->nullable();
            $table->foreignId('folder_id')->constrained('folders')->onDelete('cascade');
            $table->string('tenant_id')->nullable();
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('folder_visits');
    }
};
