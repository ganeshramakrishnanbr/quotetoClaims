import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  private readonly STORAGE_PREFIX = 'c2q_dashboard_';

  constructor(private sqliteService: SqliteService) { }

  /**
   * Store image metadata in SQLite and reference locally
   * Note: In a real implementation, this would handle actual image files
   * but for demo purposes, we're just storing metadata
   */
  public storeImage(imageData: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        // Generate a unique identifier for the image
        const imageId = `${this.STORAGE_PREFIX}${Date.now()}`;
        
        // In a real implementation, we would save the actual image file
        // For demo, we'll just store the metadata in SQLite
        
        this.sqliteService.run(`
          INSERT INTO image_metadata (
            image_name, 
            image_path, 
            description, 
            dimensions, 
            created_date, 
            last_used, 
            image_type
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          imageData.name,
          `assets/images/${imageId}`, // Simulated path
          imageData.description || '',
          imageData.dimensions || '0x0',
          new Date().toISOString(),
          new Date().toISOString(),
          imageData.type || 'unknown'
        ]);
        
        console.log(`Image metadata stored with ID: ${imageId}`);
        resolve(imageId);
      } catch (error) {
        console.error('Error storing image metadata:', error);
        reject('Failed to store image metadata');
      }
    });
  }

  /**
   * Retrieve image metadata by ID or type
   */
  public getImageMetadata(imageId?: string, imageType?: string): any {
    if (imageId) {
      return this.sqliteService.getSingle(`
        SELECT * FROM image_metadata WHERE image_path LIKE ?
      `, [`%${imageId}%`]);
    } else if (imageType) {
      return this.sqliteService.query(`
        SELECT * FROM image_metadata WHERE image_type = ?
      `, [imageType]);
    }
    
    return null;
  }

  /**
   * Get all images
   */
  public getAllImages(): any[] {
    return this.sqliteService.query('SELECT * FROM image_metadata');
  }

  /**
   * Update image metadata
   */
  public updateImageMetadata(imageId: string, updateData: any): boolean {
    try {
      // Build update query based on provided fields
      let updateFields = [];
      let params = [];
      
      Object.keys(updateData).forEach(key => {
        if (['image_name', 'description', 'dimensions', 'image_type'].includes(key)) {
          updateFields.push(`${key} = ?`);
          params.push(updateData[key]);
        }
      });
      
      if (updateFields.length === 0) {
        return false;
      }
      
      // Add last_used timestamp and image_path for WHERE clause
      params.push(new Date().toISOString());
      params.push(`%${imageId}%`);
      
      const updateQuery = `
        UPDATE image_metadata 
        SET ${updateFields.join(', ')}, last_used = ? 
        WHERE image_path LIKE ?
      `;
      
      const result = this.sqliteService.run(updateQuery, params);
      return result.changes > 0;
    } catch (error) {
      console.error('Error updating image metadata:', error);
      return false;
    }
  }

  /**
   * Delete image metadata
   */
  public deleteImage(imageId: string): boolean {
    try {
      const result = this.sqliteService.run(`
        DELETE FROM image_metadata WHERE image_path LIKE ?
      `, [`%${imageId}%`]);
      
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
}
