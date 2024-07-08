using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; } // Primary Key: Unique identifier for the project. This field uniquely identifies each project record in the table. It is required.

        [Required(ErrorMessage = "Project title is required")]
        public string ProjectTitle { get; set; } // Title of the project. This field is required.

        public string ProjectDescription { get; set; } // Description of the project. This field provides additional details about the project. It is optional.

        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; } // Start date of the project. This field specifies the start date of the project. It is required.

        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; } // End date of the project. This field specifies the end date of the project. It is required.


        [Required(ErrorMessage = "Frontend technology stack is required")]
        public string FrontEndTechStack { get; set; } // Frontend technology stack used in the project. This field specifies the frontend technology stack used in the project. It is required.

        [Required(ErrorMessage = "Backend technology stack is required")]
        public string BackendTechStack { get; set; } // Backend technology stack used in the project. This field specifies the backend technology stack used in the project. It is required.

        [Required(ErrorMessage = "Database is required")]
        public string Database { get; set; } // Database used in the project. This field specifies the database used in the project. It is required.
        
        [Required]

        public string CoverImage { get; set; }

         [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; } // Status of the project (e.g., active, completed). This field indicates the current status of the project. It is required.

    }
}
