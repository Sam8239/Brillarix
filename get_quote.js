// Tabs
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const questionBlocks = document.querySelectorAll(".question-block");
    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");
    const steps = document.querySelectorAll(".stepper li");
    const otherInput = document.getElementById("other-input");
    const totalPriceEl = document.getElementById("total-price");
    const totalEl = document.getElementById("total");

    let currentQuestionIndex = 0;

    // Points Range
    function getAdditionalRange(points) {
        if (points >= 0 && points <= 20) return "$0 - $500";
        else if (points >= 21 && points <= 40) return "$500 - $1,500";
        else if (points >= 41 && points <= 60) return "$1,500 - $3,000";
        else if (points >= 61 && points <= 80) return "$3,000 - $5,000";
        else if (points >= 81 && points <= 100) return "$5,000 - $7,000";
        else if (points >= 101 && points <= 120) return "$7,000 - $10,000";
        else if (points >= 121 && points <= 150) return "$10,000 - $15,000";
        else if (points >= 151 && points <= 200) return "$15,000 - $25,000";
        else return "Contact us for a detailed quote";
    }

    function showToast(message) {
        const toastEl = document.getElementById('liveToast');
        const toastMessageEl = document.getElementById('toastMessage');
        toastMessageEl.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    function updateTotalPrice() {
        let totalPoints = 0;

        // 1. Primary selection
        const primary = document.querySelector('input[name="firstAnswer"]:checked');
        if (primary) {
            totalPoints += parseInt(primary.getAttribute('data-price')) || 0;
        }

        // 2. Usage option
        const usageSelected = document.querySelector('input[name="usageOption"]:checked');
        if (usageSelected) {
            totalPoints += parseInt(usageSelected.getAttribute('data-price')) || 0;
        }

        // 3. Project type
        const projectType = document.querySelector('input[name="projectType"]:checked');
        if (projectType) {
            totalPoints += parseInt(projectType.getAttribute('data-price')) || 0;
        }

        // 4. Features
        const features = document.querySelectorAll('input[name="features"]:checked');
        features.forEach(feature => {
            totalPoints += parseInt(feature.getAttribute('data-price')) || 0;
        });

        // 5. Support
        const support = document.querySelector('input[name="support"]:checked');
        if (support) {
            totalPoints += parseInt(support.getAttribute('data-price')) || 0;
        }

        // 6. Timeline
        const timeline = document.querySelector('input[name="timeline"]:checked');
        let timelineBase = 0;
        if (timeline) {
            totalPoints += parseInt(timeline.getAttribute('data-points')) || 0;
            timelineBase = parseInt(timeline.getAttribute('data-base')) || 0;
        }

        const additionalRange = getAdditionalRange(totalPoints);

        const rangeMatch = additionalRange.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/);
        if (rangeMatch) {
            let min = parseInt(rangeMatch[1].replace(/,/g, ''));
            let max = parseInt(rangeMatch[2].replace(/,/g, ''));
            const lowerBound = timelineBase + min;
            const upperBound = timelineBase + max;
            totalEl.textContent = `Project Estimate: $${lowerBound.toLocaleString()} - $${upperBound.toLocaleString()}`;
        } else {
            totalEl.textContent = additionalRange;
        }
    }

    // Validation
    function validateCurrentQuestion() {
        const currentBlock = questionBlocks[currentQuestionIndex];
        if (currentBlock.querySelector('input[type="radio"]')) {
            if (![...currentBlock.querySelectorAll('input[type="radio"]')].some(radio => radio.checked)) {
                showToast("Please select an option for this question.");
                return false;
            }
        }

        const otherRadio = currentBlock.querySelector('input[type="radio"][value="other"]');
        if (otherRadio && otherRadio.checked) {
            const otherField = currentBlock.querySelector('#other-input');
            if (!otherField || otherField.value.trim() === "") {
                showToast("Please specify your usage for 'Other'.");
                return false;
            }
        }
        return true;
    }

    function showQuestion(index) {
        questionBlocks.forEach((block, i) => {
            block.classList.toggle("active", i === index);
        });
        backButton.style.display = index === 0 ? "none" : "block";
        updateStepper(index);
    }

    function updateStepper(index) {
        steps.forEach((step, i) => {
            if (i < index) {
                step.classList.add("completed");
                step.classList.remove("active");
                step.textContent = "";
            } else if (i === index) {
                step.classList.add("active");
                step.classList.remove("completed");
                step.textContent = i + 1;
            } else {
                step.classList.remove("active", "completed");
                step.textContent = i + 1;
            }
        });
    }

    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    allInputs.forEach(input => {
        input.addEventListener('change', updateTotalPrice);
    });

    const usageOptions = document.getElementsByName('usageOption');
    usageOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value === 'other' && option.checked) {
                otherInput.style.display = 'block';
            } else if (option.checked) {
                otherInput.style.display = 'none';
            }
        });
    });

    // Next button
    nextButton.addEventListener("click", function () {
        if (!validateCurrentQuestion()) return;
        updateTotalPrice();
        if (currentQuestionIndex < questionBlocks.length - 1) {
            currentQuestionIndex++;
            nextButton.textContent = currentQuestionIndex === questionBlocks.length - 1 ? "Calculate" : "Next";
            showQuestion(currentQuestionIndex);
        } else {
            totalPriceEl.classList.remove('d-none');
            nextButton.classList.add('d-none');
            backButton.classList.add('d-none');
        }
    });

    // Back button
    backButton.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    showQuestion(currentQuestionIndex);
});