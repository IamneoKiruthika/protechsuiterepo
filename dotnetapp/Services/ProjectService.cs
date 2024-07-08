using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class ProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> GetProjectById(int projectId)
        {
            return await _context.Projects.FindAsync(projectId);
        }

        public async  Task<bool> AddProject(Project project)
        {
          
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProject(int projectId, Project project)
        {
            var existingProject = await _context.Projects.FindAsync(projectId);

            if (existingProject == null)
                return false;

            existingProject.ProjectTitle = project.ProjectTitle;
            existingProject.ProjectDescription = project.ProjectDescription;
            existingProject.StartDate = project.StartDate;
            existingProject.EndDate = project.EndDate;
            existingProject.Status = project.Status;
            existingProject.FrontEndTechStack = project.FrontEndTechStack;
            existingProject.BackendTechStack = project.BackendTechStack;
            existingProject.CoverImage = project.CoverImage;
            existingProject.Database = project.Database;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProject(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
