
//DOMContentLoaded present just in case the script tag is not at the very bottom where the closing body tag is and multiple script tags get added that manipulate the DOM
document.addEventListener("DOMContentLoaded", () => {
    const addExerciseBtn = document.getElementById("addExerciseBtn");
    // Checker to make sure the button is on the ejs file (footer partial puts the script tag on all ejs files and that button isn't in all of them)
    if(addExerciseBtn){
        let exerciseCount = 1;

        function addExerciseRow() {
            //exercise count represents the index of the exercises array in the PostSchema starts at 1 since form starts at 0
            const container = document.getElementById("planInputs");
            const div = document.createElement("div");
            div.classList.add("exerciseRow", "mb-2");
            div.innerHTML = `
                <input type="text" name="exercises[${exerciseCount}][day]" placeholder="Day" class="form-control mb-1" />
                <input type="text" name="exercises[${exerciseCount}][name]" placeholder="Exercise Name" class="form-control mb-1" />
                <input type="text" name="exercises[${exerciseCount}][sets]" placeholder="Sets" class="form-control mb-1" />
                <input type="text" name="exercises[${exerciseCount}][reps]" placeholder="Reps" class="form-control mb-1" />
        `;
            container.appendChild(div);
            exerciseCount++;
        }

        document.getElementById("addExerciseBtn").addEventListener("click", addExerciseRow);
    }
})
