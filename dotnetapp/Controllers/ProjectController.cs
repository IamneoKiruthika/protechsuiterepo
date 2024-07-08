using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }
        // [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult<Project>> GetProjectById(int projectId)
        {
            var project = await _projectService.GetProjectById(projectId);

            if (project == null)
                return NotFound(new { message = "Project not found" });

            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult> AddProject([FromBody] Project project)
        {
            try
            {
                await _projectService.AddProject(project);
                return Ok(new { message = "Project added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{projectId}")]
        public async Task<ActionResult> UpdateProject(int projectId, [FromBody] Project project)
        {
            try
            {
                var success = await _projectService.UpdateProject(projectId, project);

                if (success)
                    return Ok(new { message = "Project updated successfully" });
                else
                    return NotFound(new { message = "Project not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{projectId}")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            try
            {
                var success = await _projectService.DeleteProject(projectId);

                if (success)
                    return Ok(new { message = "Project deleted successfully" });
                else
                    return NotFound(new { message = "Project not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
