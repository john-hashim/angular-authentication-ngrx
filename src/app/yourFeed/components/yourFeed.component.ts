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
  initialize() {
    var subjects = (<HTMLInputElement>(
      document.getElementById("subjects")
    )).value.split(",");
    var teachers = (<HTMLInputElement>(
      document.getElementById("teachers")
    )).value.split(",");
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var time_slots = [
      "9:30-10:30",
      "10:30-11:30",
      "11:30-12:30",
      "1:30-2:30",
      "2:30-3:30",
      "3:30-4:30",
    ];
    var scheduleData = {
      subjects: subjects,
      teachers: teachers,
      days: days,
      time_slots: time_slots,
    };
    var timetable = this.generateTimetable(scheduleData);
    // Generate HTML table code for the timetable
    var table_html = "<table>";
    table_html += "<tr><th></th>";
    for (var d = 0; d < days.length; d++) {
      table_html += "<th>" + days[d] + "</th>";
    }
    table_html += "</tr>";
    for (var t = 0; t < time_slots.length; t++) {
      table_html += "<tr>";
      table_html += "<td>" + time_slots[t] + "</td>";
      for (var d = 0; d < days.length; d++) {
        var course = timetable[t][d][0];
        var teacher = timetable[t][d][1];
        table_html += "<td>" + course + "<br>(" + teacher + ")</td>";
      }
      table_html += "</tr>";
    }
    table_html += "</table>";

    var timetableDiv = document.getElementById("timetable");
    timetableDiv.innerHTML = table_html;
  }

  generateTimetable(scheduleData) {
    var subjects = scheduleData.subjects;
    var teachers = scheduleData.teachers;
    var days = scheduleData.days;
    var time_slots = scheduleData.time_slots;
    var population_size = 100;
    var generations = 100;

    function calculateFitness(schedule) {
      var conflicts = 0;
      for (var i = 0; i < time_slots.length; i++) {
        for (var j = 0; j < days.length; j++) {
          var course = schedule[i][j];
          if (
            schedule[i].filter((c) => c[0] === course[0] && c[1] === course[1])
              .length > 1
          ) {
            conflicts += 1;
          }
        }
      }
      return 1 / (1 + conflicts);
    }

    function crossover(parent1, parent2) {
      var child_schedule = [];
      for (var i = 0; i < time_slots.length; i++) {
        var child_row = [];
        for (var j = 0; j < days.length; j++) {
          if (Math.random() < 0.5) {
            child_row.push(parent1.schedule[i][j]);
          } else {
            child_row.push(parent2.schedule[i][j]);
          }
        }
        child_schedule.push(child_row);
      }
      var child = new Timetable(subjects, teachers, days, time_slots);
      child.schedule = child_schedule;
      return child;
    }

    function mutate(schedule) {
      for (var i = 0; i < time_slots.length; i++) {
        for (var j = 0; j < days.length; j++) {
          if (Math.random() < 0.1) {
            var randomIndex = Math.floor(Math.random() * subjects.length);
            var subject = subjects[randomIndex];
            var teacher = teachers[randomIndex];
            schedule[i][j] = [subject, teacher];
          }
        }
      }
    }

    // Create an initial population
    var population = [];
    for (var i = 0; i < population_size; i++) {
      var timetable = new Timetable(subjects, teachers, days, time_slots);
      population.push(timetable);
    }

    // Evolve the population
    for (var i = 0; i < generations; i++) {
      population = population.sort(function (a, b) {
        return calculateFitness(b.schedule) - calculateFitness(a.schedule);
      });

      // Perform elitism: keep the top 10% of the population
      var elitism_size = Math.floor(population_size * 0.1);
      var new_population = population.slice(0, elitism_size);

      // Perform crossover and mutation to generate the rest of the population
      while (new_population.length < population_size) {
        var parent1 = population[Math.floor(Math.random() * elitism_size)];
        var parent2 = population[Math.floor(Math.random() * elitism_size)];
        var child = crossover(parent1, parent2);
        mutate(child.schedule);
        new_population.push(child);
      }

      population = new_population;
    }

    // Return the best timetable in the final population
    var best_timetable = population[0];
    return best_timetable.schedule;
  }
}

export class Timetable {
  subjects;
  teachers;
  days;
  time_slots;
  schedule;
  constructor(subjects, teachers, days, time_slots) {
    this.subjects = subjects;
    this.teachers = teachers;
    this.days = days;
    this.time_slots = time_slots;
    this.schedule = this.generateInitialSchedule();
  }

  generateInitialSchedule() {
    var schedule = [];
    for (var i = 0; i < this.time_slots.length; i++) {
      var row = [];
      for (var j = 0; j < this.days.length; j++) {
        var randomIndex = Math.floor(Math.random() * this.subjects.length);
        var subject = this.subjects[randomIndex];
        var teacher = this.teachers[randomIndex];
        row.push([subject, teacher]);
      }
      schedule.push(row);
    }
    return schedule;
  }
}
