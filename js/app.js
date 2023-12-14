// // Get the navigation items
const navItems = document.querySelectorAll('.navbar-nav-item');

// Add click event listeners to all navigation items except the already active one
navItems.forEach((item) => {
    item.addEventListener('click', function () {
        // Remove the "active" class from all navigation items
        navItems.forEach((navItem) => {
            navItem.classList.remove('active');
        });

        // Add the "active" class to the clicked navigation item
        this.classList.add('active');
    });
});

//------------------------------------------------//
function generateGuidelines() {
    const unitConverterGuidelines = `
        <div class="unit-converter-guidelines">
            <h3>Unit Converter App Guidelines:</h3>
            <h4>Step 1: Accessing the Unit Converter</h4>
            <ol>
                <li><strong>Open the Webpage</strong>: Launch the webpage containing the Unit Converter and Base Converter apps.</li>
                <li><strong>Locate the Unit Converter Section</strong>: Identify the specific area labeled as the "Unit Converter."</li>
            </ol>
            <h4>Step 2: Using the Unit Converter</h4>
            <ol>
                <li><strong>Select Conversion Type</strong>:
                    <ul>
                        <li><strong>Category Dropdown</strong>: Click on the dropdown labeled "Category."</li>
                        <li><strong>Choose Type</strong>: From options like Length, Mass, Volume, etc., select the desired conversion type.</li>
                    </ul>
                </li>
                <li><strong>Select Units</strong>:
                    <ul>
                        <li><strong>From Unit</strong>: Choose the unit you want to convert from using the "From Unit" dropdown.</li>
                        <li><strong>To Unit</strong>: Select the unit you want to convert to using the "To Unit" dropdown.</li>
                    </ul>
                </li>
                <li><strong>Enter Value</strong>:
                    <ul>
                        <li><strong>Input Field</strong>: Enter the value you want to convert in the provided input box.</li>
                    </ul>
                </li>
                <li><strong>Convert</strong>:
                    <ul>
                        <li><strong>Conversion Button</strong>: Click the "Convert" button to perform the unit conversion.</li>
                    </ul>
                </li>
                <li><strong>View Result</strong>:
                    <ul>
                        <li><strong>Result Section</strong>: Once converted, the result will be displayed in a dedicated section on the webpage.</li>
                    </ul>
                </li>
                <li><strong>Review Result</strong>:
                    <ul>
                        <li><strong>Conversion Details</strong>: The result section will show the converted value along with the conversion details like the selected units and conversion factor.</li>
                    </ul>
                </li>
            </ol>
        </div>
    `;



    const baseConverterGuidelines = `
    <div class="base-converter-guidelines">
        <h3>Base Converter App Guidelines:</h3>
        <h4>Step 1: Accessing the Base Converter</h4>
        <ol>
            <li><strong>Locate the Base Converter Section</strong>: Identify the section of the webpage labeled as the "Base Converter."</li>
        </ol>
        <h4>Step 2: Using the Base Converter</h4>
        <ol>
            <li><strong>Choose Bases</strong>:
                <ul>
                    <li><strong>From Base Dropdown</strong>: Click on the dropdown labeled "From Base."</li>
                    <li><strong>Select Original Base</strong>: Choose the base you want to convert from.</li>
                    <li><strong>To Base Dropdown</strong>: Click on the "To Base" dropdown.</li>
                    <li><strong>Choose Target Base</strong>: Select the base you want to convert to.</li>
                </ul>
            </li>
            <li><strong>Enter Value</strong>:
                <ul>
                    <li><strong>Number Field</strong>: Input a number adhering to the selected "From Base" in the "Number" field.</li>
                </ul>
            </li>
            <li><strong>Perform Conversion</strong>:
                <ul>
                    <li><strong>Convert Button</strong>: Click the "Convert" button to initiate the conversion process.</li>
                    <li><strong>View Result</strong>: The converted number and a detailed table showcasing the base conversions will appear below.</li>
                </ul>
            </li>
        </ol>
    </div>
`;

    const mainContainer = document.getElementById('elements-container');
    mainContainer.innerHTML = "";
    const guidelineContainer = document.createElement('div');
    guidelineContainer.classList.add('guideline-container');
    guidelineContainer.innerHTML = unitConverterGuidelines + baseConverterGuidelines;

    mainContainer.appendChild(guidelineContainer);
}

generateGuidelines();
//------------------------------------------------//
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var closeBtn = document.getElementById("closeModal");
var closeBtn2 = document.getElementById("closeModalBtn");


// Function to set the text in the modal body
function setModalText(title, text) {
    let modalTitle = document.querySelector(".modal-header h2");
    let modalBody = document.querySelector(".modal-body");

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    modalTitle.innerHTML = title;
    modalBody.innerHTML = text;
    showModal();
}

function showModal() {
    modal.style.display = "block";
    setTimeout(function() {
        modal.querySelector('.modal-content').style.transform = "scale(1)";
    }, 50);
}

closeBtn.onclick = function() {
    modal.querySelector('.modal-content').style.transform = "scale(0)";
    setTimeout(function() {
        modal.style.display = "none";
    }, 300);
}

closeBtn2.onclick = function() {
    modal.querySelector('.modal-content').style.transform = "scale(0)";
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.querySelector('.modal-content').style.transform = "scale(0)";
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);
    }
}

//-----------------------------------------------//
// Add event listener to the img tag
document.querySelector('.navbar-title img').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to index.html
});

// Add event listener to the h1 tag
document.querySelector('.navbar-title h1').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to index.html
});

// Add event listener to the parent-company paragraph
document.getElementById('parent-company').addEventListener('click', function () {
    window.location.href = 'https://BcsBankSuccess.com'; // Redirect to BcsBankSuccess.com
});
//-------------------------------------------------//
function showLoadingAnimation() {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.style.display = 'flex'; // Display the loader container
    }
}

function hideLoadingAnimation() {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.style.display = 'none'; // Hide the loader container
    }
}

//-----------------------------------------------------//
const currentDate = new Date(); 
const currentYear = currentDate.getFullYear(); 
document.getElementById('currentYear').innerHTML = currentYear;