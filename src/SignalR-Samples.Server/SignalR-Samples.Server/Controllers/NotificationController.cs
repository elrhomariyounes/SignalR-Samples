using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_Samples.Server.Models;

namespace SignalR_Samples.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("notifications")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _hubContext.Clients.All.SendAsync("notification", DateTime.Now + " : " + model.Title);
                return Ok("Notification send");
            }
            return BadRequest("Invalid Request");
        }
    }
}
