import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const UserForm = () => {
  const initialData = {
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData((prev) => ({ ...prev, id: uuidv4() })); // Generate new ID
    }
  }, []);

  // Warn if user tries to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleChange = (e) => {
    setIsDirty(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsDirty(false);
    alert("Data saved!");
  };

  return (
    <>
      <h2>User Data Form</h2>
      <Box p={4} maxWidth={400} mx="auto">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit" fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UserForm;
