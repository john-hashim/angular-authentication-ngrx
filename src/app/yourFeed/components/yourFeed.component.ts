import { Component } from "@angular/core";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { ErrorMessageComponent } from "src/app/shared/components/errorMessage/errorMessage.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";

@Component({
  selector: "mc-your-feed",
  templateUrl: "./yourFeed.component.html",
  standalone: true,
  imports: [BannerComponent, ErrorMessageComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  teacherClassesPerDay = {};

  generateTimetable() {
    var subjects = (<HTMLInputElement>(
      document.getElementById("subjects")
    )).value.split(",");
    var teachers = (<HTMLInputElement>(
      document.getElementById("teachers")
    )).value.split(",");
    var daysOfWeek = (<HTMLInputElement>(
      document.getElementById("days")
    )).value.split(",");
    var timeSlots = (<HTMLInputElement>(
      document.getElementById("timeSlots")
    )).value.split(",");

    var maxClassesPerDay = 6;

    var timetable = document.getElementById("timetable") as HTMLTableElement;
    timetable.innerHTML = "";

    // Rest of the code remains the same

    for (var j = 0; j < timeSlots.length; j++) {
      var row = timetable.insertRow();
      var timeCell = row.insertCell();
      timeCell.innerHTML = timeSlots[j];

      for (var k = 0; k < daysOfWeek.length; k++) {
        var cell = row.insertCell();
        var validCourse = false;
        var attempt = 0; // Limit the number of attempts

        while (!validCourse && attempt < subjects.length) {
          var randomIndex = Math.floor(Math.random() * subjects.length);
          var randomSubject = subjects[randomIndex];
          var assignedTeacher = teachers[randomIndex];
          if (this.isTeacherAvailable(assignedTeacher, k, maxClassesPerDay)) {
            validCourse = true;
            this.assignClassToTeacher(assignedTeacher, k);
            cell.innerHTML = randomSubject + "<br>" + assignedTeacher;
          }
          attempt++;
        }
        if (!validCourse) {
          cell.innerHTML = "No Class";
        }
      }
    }
  }

  isTeacherAvailable(teacher, dayIndex, maxClassesPerDay) {
    if (!this.teacherClassesPerDay[teacher]) {
      this.teacherClassesPerDay[teacher] = [];
      for (let i = 0; i < 7; i++) {
        this.teacherClassesPerDay[teacher][i] = 0; // Initialize with zero classes on each day
      }
    }

    return this.teacherClassesPerDay[teacher][dayIndex] < maxClassesPerDay;
  }

  assignClassToTeacher(teacher, dayIndex) {
    if (!this.teacherClassesPerDay[teacher]) {
      this.teacherClassesPerDay[teacher] = [];
      for (let i = 0; i < 7; i++) {
        this.teacherClassesPerDay[teacher][i] = 0;
      }
    }

    this.teacherClassesPerDay[teacher][dayIndex]++;
  }
}
