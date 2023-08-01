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

    var maxClassesPerDay = 3; // Set the maximum number of classes per day for each teacher

    var timetable = document.getElementById("timetable") as HTMLTableElement;
    timetable.innerHTML = "";

    var headerRow = timetable.insertRow();
    var headerCell = headerRow.insertCell();
    headerCell.innerHTML = "";

    for (var i = 0; i < daysOfWeek.length; i++) {
      headerCell = headerRow.insertCell();
      headerCell.innerHTML = daysOfWeek[i];
    }

    for (var j = 0; j < timeSlots.length; j++) {
      var row = timetable.insertRow();
      var timeCell = row.insertCell();
      timeCell.innerHTML = timeSlots[j];

      for (var k = 0; k < daysOfWeek.length; k++) {
        var cell = row.insertCell();
        var validCourse = false;

        while (!validCourse) {
          var randomIndex = Math.floor(Math.random() * subjects.length);
          var randomSubject = subjects[randomIndex];
          var assignedTeacher = teachers[randomIndex];

          if (this.isTeacherAvailable(assignedTeacher, k, maxClassesPerDay)) {
            validCourse = true;
            this.assignClassToTeacher(assignedTeacher, k);
            cell.innerHTML = randomSubject + "<br>" + assignedTeacher;
          }
        }
      }
    }
  }

  teacherClassesPerDay = {};

  isTeacherAvailable(teacher, dayIndex, maxClassesPerDay) {
    if (!this.teacherClassesPerDay[teacher]) {
      this.teacherClassesPerDay[teacher] = [];
    }

    return this.teacherClassesPerDay[teacher].length < maxClassesPerDay;
  }

  assignClassToTeacher(teacher, dayIndex) {
    if (!this.teacherClassesPerDay[teacher]) {
      this.teacherClassesPerDay[teacher] = [];
    }

    this.teacherClassesPerDay[teacher].push(dayIndex);
  }
}
