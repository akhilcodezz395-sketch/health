import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Calendar, Clock, Pill, PlusCircle, Trash2 } from "lucide-react";
import { MedicineBasic } from "@/services/medicineService";
import { toast } from "@/hooks/use-toast";

interface MedicineReminderProps {
  selectedMedicine: MedicineBasic | null;
}

interface Reminder {
  id: string;
  medicineName: string;
  time: string;
  frequency: string;
  dosage: string;
}

const MedicineReminders = ({ selectedMedicine }: MedicineReminderProps) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem('medicineReminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    medicineName: selectedMedicine?.name || '',
    time: '',
    frequency: 'daily',
    dosage: '1 tablet',
  });

  const addReminder = () => {
    if (!newReminder.medicineName || !newReminder.time) {
      toast({
        title: "Missing information",
        description: "Please enter all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
    };

    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem('medicineReminders', JSON.stringify(updatedReminders));
    
    // Reset form but keep the medicine name if one was selected
    setNewReminder({
      medicineName: selectedMedicine?.name || '',
      time: '',
      frequency: 'daily',
      dosage: '1 tablet',
    });

    toast({
      title: "Reminder created",
      description: `You'll be reminded to take ${reminder.medicineName} at ${reminder.time}`
    });
    
    // Request notification permission if not granted
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem('medicineReminders', JSON.stringify(updatedReminders));
    
    toast({
      title: "Reminder deleted",
      description: "The medication reminder has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="medicineName">Medicine</Label>
            <Input 
              id="medicineName"
              value={newReminder.medicineName}
              onChange={(e) => setNewReminder({...newReminder, medicineName: e.target.value})}
              placeholder="Enter medicine name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Reminder Time</Label>
            <Input 
              id="time"
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={newReminder.frequency}
                onValueChange={(value) => setNewReminder({...newReminder, frequency: value})}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="twice-daily">Twice Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="as-needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input 
                id="dosage"
                value={newReminder.dosage}
                onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
                placeholder="e.g., 1 tablet"
              />
            </div>
          </div>
          
          <Button onClick={addReminder} className="w-full flex items-center justify-center gap-2 mt-2">
            <PlusCircle className="h-4 w-4" />
            Add Reminder
          </Button>
        </div>
      </div>

      {reminders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Reminders</h3>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="bg-white border-none shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{reminder.medicineName}</CardTitle>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => deleteReminder(reminder.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{reminder.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{reminder.frequency.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>{reminder.dosage}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineReminders;
