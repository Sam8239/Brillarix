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

    const cardElements = document.querySelectorAll('.card-pricing');
    const usageOptions = document.getElementsByName('usageOption');
    const otherInput = document.getElementById('other-input');
    const totalPriceEl = document.getElementById('total-price');
    const total = document.getElementById('total');

    let currentQuestionIndex = 0;
    let selectedTypes = [];

    function showToast(message) {
        const toastEl = document.getElementById('liveToast');
        const toastMessageEl = document.getElementById('toastMessage');
        toastMessageEl.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    function updateTotalPrice() {
        let total = 0;

        // Sum selected project types (cards)
        selectedTypes.forEach(type => {
            const card = document.querySelector(`.card-pricing[data-type="${type}"]`);
            total += parseInt(card.getAttribute('data-price')) || 0;
        });

        // Primary objective (firstAnswer)
        const primary = document.querySelector('input[name="firstAnswer"]:checked');
        if (primary) {
            total += parseInt(primary.getAttribute('data-price')) || 0;
        }

        // Usage option (usageOption)
        const usageSelected = document.querySelector('input[name="usageOption"]:checked');
        if (usageSelected) {
            total += parseInt(usageSelected.getAttribute('data-price')) || 0;
        }

        // Additional features (checkboxes)
        const features = document.querySelectorAll('input[name="features"]:checked');
        features.forEach(feature => {
            total += parseInt(feature.getAttribute('data-price')) || 0;
        });

        // Estimated number of users (users)
        const users = document.querySelector('input[name="users"]:checked');
        if (users) {
            total += parseInt(users.getAttribute('data-price')) || 0;
        }

        // Required timeline (timeline)
        const timeline = document.querySelector('input[name="timeline"]:checked');
        if (timeline) {
            total += parseInt(timeline.getAttribute('data-price')) || 0;
        }

        // Post-launch support (support)
        const support = document.querySelector('input[name="support"]:checked');
        if (support) {
            total += parseInt(support.getAttribute('data-price')) || 0;
        }

        total.textContent = `Project Estimate: $${total}`;
    }

    // Event listeners for card selection
    cardElements.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            const type = card.getAttribute('data-type');
            if (selectedTypes.includes(type)) {
                selectedTypes = selectedTypes.filter(item => item !== type);
            } else {
                selectedTypes.push(type);
            }
            updateTotalPrice();
        });
    });

    // Event listeners for usage options (also handling the "other" input)
    usageOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value === 'other' && option.checked) {
                otherInput.style.display = 'block';
            } else if (option.checked) {
                otherInput.style.display = 'none';
            }
            updateTotalPrice();
        });
    });

    // Add change event listeners for other radio groups and checkboxes
    const radioGroups = ["firstAnswer", "users", "timeline", "support"];
    radioGroups.forEach(name => {
        document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            input.addEventListener('change', updateTotalPrice);
        });
    });
    document.querySelectorAll('input[name="features"]').forEach(input => {
        input.addEventListener('change', updateTotalPrice);
    });

    function validateCurrentQuestion() {
        const currentBlock = questionBlocks[currentQuestionIndex];
        if (currentQuestionIndex === 0) {
            if (selectedTypes.length === 0) {
                showToast("Please select at least one project type.");
                return false;
            }
            const firstAnswerRadios = currentBlock.querySelectorAll('input[name="firstAnswer"]');
            if (firstAnswerRadios.length && ![...firstAnswerRadios].some(radio => radio.checked)) {
                showToast("Please answer the first question.");
                return false;
            }
        } else {
            const radios = currentBlock.querySelectorAll('input[type="radio"]');
            if (radios.length && ![...radios].some(radio => radio.checked)) {
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

    showQuestion(currentQuestionIndex);

    nextButton.addEventListener("click", function () {
        if (!validateCurrentQuestion()) return;
        updateTotalPrice();

        if (currentQuestionIndex < questionBlocks.length - 1) {
            currentQuestionIndex++;
            if (currentQuestionIndex === 5) {
                nextButton.textContent = "Calculate";
            } else {
                nextButton.textContent = "Next";
            }

            showQuestion(currentQuestionIndex);
        } else {
            totalPriceEl.classList.remove('d-none');
            nextButton.classList.add('d-none');
            backButton.classList.add('d-none');
        }
    });


    backButton.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
});