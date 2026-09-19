

const API_URL = "http://127.0.0.1:8000/predict";



const form =
    document.getElementById("predictionForm");

const predictButton =
    document.getElementById("predictButton");

const buttonText =
    document.getElementById("buttonText");

const resultCard =
    document.getElementById("resultCard");

const scoreElement =
    document.getElementById("score");

const errorBox =
    document.getElementById("errorBox");

const newPrediction =
    document.getElementById("newPrediction");



function showError(message) {

    errorBox.textContent = message;

    errorBox.style.display = "block";

}


function hideError() {

    errorBox.textContent = "";

    errorBox.style.display = "none";

}



function setLoading(isLoading) {

    predictButton.disabled = isLoading;


    if (isLoading) {

        predictButton.classList.add("loading");

        buttonText.textContent =
            "Analyzing...";

    } else {

        predictButton.classList.remove("loading");

        buttonText.textContent =
            "Predict Mental Health Score";

    }

}



function getFormData() {

    const data = {

        age: Number(
            document.getElementById("age").value
        ),

        gender:
            document.getElementById("gender").value,

        country:
            document.getElementById("country").value,

        academic_level:
            document.getElementById("academic_level").value,

        most_used_platform:
            document.getElementById(
                "most_used_platform"
            ).value,

        purpose_of_use:
            document.getElementById(
                "purpose_of_use"
            ).value,

        avg_daily_usage_hours:
            Number(
                document.getElementById(
                    "avg_daily_usage_hours"
                ).value
            ),

        daily_unlocks:
            Number(
                document.getElementById(
                    "daily_unlocks"
                ).value
            ),

        study_hours:
            Number(
                document.getElementById(
                    "study_hours"
                ).value
            ),

        physical_activity_hours:
            Number(
                document.getElementById(
                    "physical_activity_hours"
                ).value
            ),

        sleep_hours_per_night:
            Number(
                document.getElementById(
                    "sleep_hours_per_night"
                ).value
            ),

        stress_level:
            document.getElementById(
                "stress_level"
            ).value
    };


    return data;
}



function validateData(data) {


    // Age

    if (
        data.age < 0 ||
        data.age > 100
    ) {

        return "Age must be between 0 and 100.";

    }


    // Daily usage

    if (
        data.avg_daily_usage_hours < 0 ||
        data.avg_daily_usage_hours > 24
    ) {

        return "Average daily usage must be between 0 and 24 hours.";

    }


    // Unlocks

    if (data.daily_unlocks < 0) {

        return "Daily unlocks cannot be negative.";

    }


    // Study

    if (
        data.study_hours < 0 ||
        data.study_hours > 24
    ) {

        return "Study hours must be between 0 and 24.";

    }


    // Physical activity

    if (
        data.physical_activity_hours < 0 ||
        data.physical_activity_hours > 24
    ) {

        return "Physical activity hours must be between 0 and 24.";

    }


    // Sleep

    if (
        data.sleep_hours_per_night < 0 ||
        data.sleep_hours_per_night > 24
    ) {

        return "Sleep hours must be between 0 and 24.";

    }


    return null;
}



form.addEventListener(
    "submit",
    async function (event) {

        // Stop normal HTML form submission

        event.preventDefault();


        // Hide previous error

        hideError();


        // Hide previous result

        resultCard.classList.add("hidden");


        // Get input data

        const data = getFormData();


        // Validate

        const validationError =
            validateData(data);


        if (validationError) {

            showError(validationError);

            return;

        }


        // Start loading

        setLoading(true);


        try {



            const response =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(data)

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                let errorMessage =
                    "Unable to generate prediction.";


                // FastAPI validation error

                if (result.detail) {


                    if (
                        Array.isArray(
                            result.detail
                        )
                    ) {

                        errorMessage =
                            result.detail
                                .map(
                                    item =>
                                        item.msg
                                )
                                .join("; ");

                    } else {

                        errorMessage =
                            result.detail;

                    }

                }


                throw new Error(
                    errorMessage
                );
            }



            const score =
                Number(
                    result
                        .predicted_mental_health_score
                );


            // Check score

            if (Number.isNaN(score)) {

                throw new Error(
                    "The API returned an invalid prediction score."
                );

            }


            scoreElement.textContent =
                score.toFixed(2);


            // Show result card

            resultCard.classList.remove(
                "hidden"
            );


            // Scroll to result

            resultCard.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


        }

        catch (error) {


            console.error(
                "Prediction error:",
                error
            );


            if (
                error instanceof TypeError
            ) {

                showError(
                    "Cannot connect to the FastAPI server. " +
                    "Please make sure Uvicorn is running at " +
                    "http://127.0.0.1:8000"
                );

            }

            else {

                showError(
                    error.message ||
                    "Something went wrong. Please try again."
                );

            }

        }


        finally {

            // Stop loading

            setLoading(false);

        }

    }
);



newPrediction.addEventListener(
    "click",
    function () {

        // Hide result

        resultCard.classList.add(
            "hidden"
        );


        // Scroll back to form

        form.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }
);
