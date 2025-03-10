import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import { Footer } from "./Footer"; // Assuming Footer is a separate component

const jobCategories = [
  { name: "Software Development", icon: <WorkIcon />, color: "#4051b5" },
  { name: "Marketing", icon: <TrendingUpIcon />, color: "#ff9800" },
  { name: "Design", icon: <CategoryIcon />, color: "#4caf50" },
  { name: "Finance", icon: <CategoryIcon />, color: "#f44336" },
  { name: "Sales", icon: <CategoryIcon />, color: "#2196f3" },
  { name: "Human Resources", icon: <CategoryIcon />, color: "#9c27b0" },
  { name: "Customer Support", icon: <CategoryIcon />, color: "#ff5722" },
  { name: "Healthcare", icon: <CategoryIcon />, color: "#00bcd4" },
  { name: "Education", icon: <CategoryIcon />, color: "#ffc107" },
  { name: "Engineering", icon: <CategoryIcon />, color: "#8bc34a" },
  { name: "Data Science", icon: <CategoryIcon />, color: "#607d8b" },
  { name: "Project Management", icon: <CategoryIcon />, color: "#e91e63" },
  { name: "Legal", icon: <CategoryIcon />, color: "#3f51b5" },
  { name: "Research", icon: <CategoryIcon />, color: "#009688" },
  { name: "Operations", icon: <CategoryIcon />, color: "#795548" },
  { name: "Retail", icon: <CategoryIcon />, color: "#ffeb3b" },
  { name: "Content Writing", icon: <CategoryIcon />, color: "#ff4081" },
  { name: "Consulting", icon: <CategoryIcon />, color: "#00bcd4" },
  { name: "Administrative", icon: <CategoryIcon />, color: "#ff6f00" },
  { name: "Manufacturing", icon: <CategoryIcon />, color: "#9e9e9e" },
  { name: "Nonprofit", icon: <CategoryIcon />, color: "#4caf50" },
  { name: "Real Estate", icon: <CategoryIcon />, color: "#f44336" },
  { name: "Transportation", icon: <CategoryIcon />, color: "#2196f3" },
  { name: "Hospitality", icon: <CategoryIcon />, color: "#9c27b0" },
  { name: "Travel", icon: <CategoryIcon />, color: "#ff5722" },
  { name: "Agriculture", icon: <CategoryIcon />, color: "#00bcd4" },
  { name: "Architecture", icon: <CategoryIcon />, color: "#ffc107" },
  { name: "Art", icon: <CategoryIcon />, color: "#8bc34a" },
  { name: "Music", icon: <CategoryIcon />, color: "#607d8b" },
  { name: "Photography", icon: <CategoryIcon />, color: "#e91e63" },
  { name: "Writing", icon: <CategoryIcon />, color: "#3f51b5" },
  { name: "Other", icon: <CategoryIcon />, color: "#009688" },

];

const featuredJobs = [
  { title: "Frontend Developer", company: "Google", location: "Bangalore", salary: "₹12LPA", type: "Full-Time" },
  { title: "Data Scientist", company: "Microsoft", location: "Hyderabad", salary: "₹15LPA", type: "Remote" },
  { title: "Product Manager", company: "Apple", location: "Pune", salary: "₹18LPA", type: "Part-Time" },
  { title: "UX Designer", company: "Facebook", location: "Mumbai", salary: "₹11LPA", type: "Full-Time" },
  { title: "Backend Developer", company: "Amazon", location: "Chennai", salary: "₹13LPA", type: "Hybrid" },
  { title: "DevOps Engineer", company: "Tesla", location: "Bangalore", salary: "₹14LPA", type: "Remote" },
  { title: "Data Analyst", company: "IBM", location: "Hyderabad", salary: "₹9LPA", type: "Full-Time" },
  { title: "Full Stack Developer", company: "Spotify", location: "Pune", salary: "₹16LPA", type: "Part-Time" },
  { title: "UI/UX Designer", company: "Netflix", location: "Mumbai", salary: "₹10LPA", type: "Full-Time" },
  { title: "Machine Learning Engineer", company: "Google", location: "Chennai", salary: "₹17LPA", type: "Hybrid" },
  { title: "Product Designer", company: "Microsoft", location: "Bangalore", salary: "₹13LPA", type: "Remote" },
  { title: "Frontend Developer", company: "Apple", location: "Hyderabad", salary: "₹12LPA", type: "Full-Time" },
  { title: "Backend Developer", company: "Facebook", location: "Pune", salary: "₹14LPA", type: "Part-Time" },
  { title: "Data Scientist", company: "Amazon", location: "Mumbai", salary: "₹15LPA", type: "Full-Time" },
  { title: "UX Designer", company: "Tesla", location: "Chennai", salary: "₹11LPA", type: "Remote" },
  { title: "DevOps Engineer", company: "IBM", location: "Bangalore", salary: "₹14LPA", type: "Hybrid" },
  { title: "Data Analyst", company: "Spotify", location: "Hyderabad", salary: "₹9LPA", type: "Full-Time" },
  { title: "Full Stack Developer", company: "Netflix", location: "Pune", salary: "₹16LPA", type: "Part-Time" },
];

const latestJobs = [
  { title: "UI/UX Designer", company: "Netflix", location: "Mumbai", salary: "₹10LPA", type: "Full-Time" },
  { title: "Machine Learning Engineer", company: "Google", location: "Chennai", salary: "₹17LPA", type: "Hybrid" },
  { title: "Product Designer", company: "Microsoft", location: "Bangalore", salary: "₹13LPA", type: "Remote" },
  { title: "Frontend Developer", company: "Apple", location: "Hyderabad", salary: "₹12LPA", type: "Full-Time" },
  { title: "Backend Developer", company: "Facebook", location: "Pune", salary: "₹14LPA", type: "Part-Time" },
  { title: "Data Scientist", company: "Amazon", location: "Mumbai", salary: "₹15LPA", type: "Full-Time" },
  { title: "UX Designer", company: "Tesla", location: "Chennai", salary: "₹11LPA", type: "Remote" },
  { title: "DevOps Engineer", company: "IBM", location: "Bangalore", salary: "₹14LPA", type: "Hybrid" },
  { title: "Data Analyst", company: "Spotify", location: "Hyderabad", salary: "₹9LPA", type: "Full-Time" },
  { title: "Full Stack Developer", company: "Netflix", location: "Pune", salary: "₹16LPA", type: "Part-Time" },
  { title: "Frontend Developer", company: "Google", location: "Bangalore", salary: "₹12LPA", type: "Full-Time" },
  { title: "Data Scientist", company: "Microsoft", location: "Hyderabad", salary: "₹15LPA", type: "Remote" },
  { title: "Product Manager", company: "Apple", location: "Pune", salary: "₹18LPA", type: "Part-Time" },
  { title: "UX Designer", company: "Facebook", location: "Mumbai", salary: "₹11LPA", type: "Full-Time" },
  { title: "Backend Developer", company: "Amazon", location: "Chennai", salary: "₹13LPA", type: "Hybrid" },
  { title: "DevOps Engineer", company: "Tesla", location: "Bangalore", salary: "₹14LPA", type: "Remote" },
  { title: "Data Analyst", company: "IBM", location: "Hyderabad", salary: "₹9LPA", type: "Full-Time" },
  { title: "Full Stack Developer", company: "Spotify", location: "Pune", salary: "₹16LPA", type: "Part-Time" },

];

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", py: 10, backgroundColor: "#4051b5", color: "#fff" }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold">
            Find Your Dream Job with Zudyog
          </Typography>
          <Typography variant="h6" sx={{ my: 2 }}>
            Search & apply to thousands of jobs in various industries.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
            <TextField variant="outlined" placeholder="Job Title or Keywords" sx={{ backgroundColor: "#fff", borderRadius: 1 }} />
            <TextField variant="outlined" placeholder="Location" sx={{ backgroundColor: "#fff", borderRadius: 1 }} />
            <Button variant="contained" color="secondary" startIcon={<SearchIcon />}>
              Search Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Explore by Category */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Explore by Category
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {jobCategories.map((category, index) => (
            <Grid key={index}>
              <Button variant="outlined" startIcon={category.icon} sx={{ px: 3, py: 1.5, borderRadius: 2, color: category.color }}>
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Jobs Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Featured Jobs
        </Typography>
        <Grid container spacing={3}>
          {featuredJobs.map((job, index) => (
            // sm={6} md={4} 
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Typography color="text.secondary">{job.company} - {job.location}</Typography>
                  <Typography sx={{ mt: 1 }} color="primary">{job.salary}</Typography>
                  <Typography variant="caption" sx={{ backgroundColor: "#eeeeee", px: 1, py: 0.5, borderRadius: 1 }}>
                    {job.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" fullWidth>Apply Now</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest Job Openings */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Latest Job Openings
        </Typography>
        <Grid container spacing={3}>
          {latestJobs.map((job, index) => (
            // sm={6} md={4}
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Typography color="text.secondary">{job.company} - {job.location}</Typography>
                  <Typography sx={{ mt: 1 }} color="primary">{job.salary}</Typography>
                  <Typography variant="caption" sx={{ backgroundColor: "#eeeeee", px: 1, py: 0.5, borderRadius: 1 }}>
                    {job.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" fullWidth>Apply Now</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      {/* <Footer /> */}
    </Box>
  );
}
