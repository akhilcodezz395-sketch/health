
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, Check, X, Loader2 } from "lucide-react";
import { MedicineDetailed } from "@/services/medicineService";

interface PrescriptionUploadProps {
  medicineToAdd?: MedicineDetailed;
}

const PrescriptionUpload = ({ medicineToAdd }: PrescriptionUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image of your prescription",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an image of your prescription",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload with timeout
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Prescription uploaded successfully",
        description: medicineToAdd 
          ? `Your prescription for ${medicineToAdd.name} has been uploaded and is being reviewed`
          : "Your prescription has been uploaded and is being reviewed",
      });
      
      // Store in local storage for demo purposes
      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      prescriptions.push({
        id: Date.now().toString(),
        fileName: file.name,
        doctorName,
        notes,
        medicine: medicineToAdd?.name || null,
        status: 'Under Review',
        date: new Date().toISOString()
      });
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
      
      // Reset form
      setFile(null);
      setPreview(null);
      setDoctorName("");
      setNotes("");
    }, 2000);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      {preview ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={preview} 
            alt="Prescription preview" 
            className="w-full object-contain max-h-64"
          />
          <Button 
            size="icon" 
            variant="destructive" 
            className="absolute top-2 right-2 rounded-full h-8 w-8"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Prescription</h3>
          <p className="text-sm text-muted-foreground mb-4">
            JPG, PNG or PDF file (max 5MB)
          </p>
          <Input
            id="prescription-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Label htmlFor="prescription-upload" className="cursor-pointer">
            <Button variant="outline" className="mr-2" type="button">
              Browse Files
            </Button>
          </Label>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="doctorName">Doctor's Name (Optional)</Label>
          <Input
            id="doctorName"
            placeholder="Enter doctor's name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Input
            id="notes"
            placeholder="Any specific instructions or notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        {medicineToAdd && (
          <div className="p-3 bg-primary/10 rounded-md text-primary">
            <p className="text-sm flex items-center gap-2">
              <Check className="h-4 w-4" />
              Adding prescription for: {medicineToAdd.name}
            </p>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Prescription
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
