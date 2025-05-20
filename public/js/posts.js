
//DOMContentLoaded present just in case the script tag is not at the very bottom where the closing body tag is and multiple script tags get added that manipulate the DOM
document.addEventListener("DOMContentLoaded", () => {
    const addExerciseBtn = document.getElementById("addExerciseBtn");
    const addEditExerciseBtn = document.getElementById("addEditExerciseBtn");
    const roleSelect = document.getElementById("role");
    const therapistDiv = document.getElementById("therapistSelect");
    const titleFilter = document.getElementById('titleFilter');
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

        addExerciseBtn.addEventListener("click", addExerciseRow);
    }

    //Only run the logic if "add new exercise" button exists with an id of addEditExerciseBtn
    if(addEditExerciseBtn) {

        //checks to see the current amount of exercises
        let exerciseCount = 0;
        const container = document.getElementById("editExerciseContainer");

        //If container exists it gets current amount of exercises in the plan from data-exercise-count="<%= post.exercises.length %>" (dataset.property removes dashes and converts to camelCase with dot notation)
        if (container) {
            const count = container.dataset.exerciseCount;
            //set exercise count if it exists to count variable or (decimal representation) or 0
            exerciseCount = count ? parseInt(count, 10) : 0;
        }

        //grabs postId from data-post-id="<%= post._id %>" in tbody, that's also used in the form action to send data to the right route
        const postId = container?.dataset?.postId;

        addEditExerciseBtn.addEventListener("click", () => {

            const tr = document.createElement("tr");

            // Create a unique form ID for this new exercise row so that multiple rows/forms can coexist and be targeted individually.
            const formId = `form-${exerciseCount}`;

            // Inject only <td> elements inside the <tr> (not the form directly). The inputs and submit button use the form attribute to link themselves to the hidden form (which will be outside the table row).
            tr.innerHTML = `
                <td><input name="day" type="text" class="form-control" form="${formId}" /></td>
                <td><input name="name" type="text" class="form-control" form="${formId}" /></td>
                <td><input name="sets" type="number" class="form-control" form="${formId}" /></td>
                <td><input name="reps" type="number" class="form-control" form="${formId}" /></td>
                <td>
                    <!-- Submit button submits the hidden form by referencing its ID -->
                    <button type="submit" class="btn btn-success btn-sm" form="${formId}">Add</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm delete-temp-row">Delete</button>
                </td>
            `;

            // Create a hidden form and append it to the document body
            const form = document.createElement("form");
            form.action = `/post/${postId}/addExercise?_method=PUT`;
            form.method = "POST";
            form.id = formId;
            // form.style.display = "none"; // Keeps it hidden from the UI

            // Append the hidden form to the body (not inside table!)
            document.body.appendChild(form);

            // Append the table row with inputs to the table body
            container.appendChild(tr);
            exerciseCount++;

             // Enable deleting the temporary row and its hidden form (before it gets added to the DOM permanently)
            const deleteBtn = tr.querySelector(".delete-temp-row");
            deleteBtn.addEventListener("click", () => {
                tr.remove(); //remove tr in the tbody tag that was appended
                form.remove(); //remove the new hidden form that got appended at the bottom of the body
            })
        })

    }

    // Make sure roleSelect (element with an id="role") exists in the DOM 
    if (roleSelect) {
        function showTherapistSelection() {
            if (roleSelect.value === "Patient"){
                therapistDiv.classList.remove("hidden");
            } else {
                therapistDiv.classList.add("hidden");
            }
        }
        roleSelect.addEventListener("change", showTherapistSelection);
        // Also handle case where the page reloads with "Patient" preselected
        showTherapistSelection();
    } 
    
    if (titleFilter){
        function filterPostsByTitle(selectedTitle) {
            const posts = document.querySelectorAll('.post-item');
        
        posts.forEach(post => {
                const postTitle = post.getAttribute('data-title');
                post.style.display = (postTitle === selectedTitle) ? 'block' : 'none';
            });
        }
        // Filter on dropdown change
        if (titleFilter) {
            titleFilter.addEventListener('change', function () {
                const selectedTitle = this.value;
                filterPostsByTitle(selectedTitle);
            });
        // Initial filter on page load using first option
        window.addEventListener('DOMContentLoaded', function () {
            const defaultTitle = titleFilter.options[0]?.value;
            if (defaultTitle) {
                titleFilter.value = defaultTitle;
                filterPostsByTitle(defaultTitle);
            }
        });
        }
    }
})
