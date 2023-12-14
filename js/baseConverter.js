function generateBaseConverterUI() {
  const elements_container = document.getElementById("elements-container");
  elements_container.innerHTML = "";
  // Base container element
  const baseConverterContainer = document.createElement('div');
  baseConverterContainer.classList.add('base-converter-container');

  // Base converter element
  const baseConverter = document.createElement('div');
  baseConverter.classList.add('base-converter');

  // Heading
  const heading = document.createElement('h1');
  heading.textContent = 'Base Converter';
  baseConverter.appendChild(heading);

  // Input groups
  const inputGroups = [
    {
      label: 'From base:',
      id: 'fromBase',
      options: ['Decimal', 'Binary', 'Octal', 'Hexadecimal'],
      values: [10, 2, 8, 16],
    },
    {
      label: 'Enter a number:',
      id: 'number',
      type: 'text',
      placeholder: 'Enter a number',
    },
    {
      label: 'To base:',
      id: 'toBase',
      options: ['Binary', 'Octal', 'Decimal', 'Hexadecimal'],
      values: [2, 8, 10, 16],
    },
  ];

  for (const inputGroup of inputGroups) {
    const groupElement = document.createElement('div');
    groupElement.classList.add('input-group');

    const labelElement = document.createElement('label');
    labelElement.textContent = inputGroup.label;
    labelElement.for = inputGroup.id;
    groupElement.appendChild(labelElement);

    if (inputGroup.type) {
      const inputElement = document.createElement('input');
      inputElement.type = inputGroup.type;
      inputElement.id = inputGroup.id;
      inputElement.placeholder = inputGroup.placeholder;
      groupElement.appendChild(inputElement);
    } else {
      const selectElement = document.createElement('select');
      selectElement.id = inputGroup.id;
      for (let i = 0; i < inputGroup.options.length; i++) {
        const optionElement = document.createElement('option');
        optionElement.textContent = inputGroup.options[i];
        optionElement.value = inputGroup.values[i];
        selectElement.appendChild(optionElement);
      }
      groupElement.appendChild(selectElement);
    }

    baseConverter.appendChild(groupElement);
  }

  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('input-group', 'btn-container');

  const convertButton = document.createElement('button');
  convertButton.textContent = 'Convert';
  convertButton.onclick = convert;
  buttonContainer.appendChild(convertButton);

  const tableButton = document.createElement('button');
  tableButton.textContent = 'Base Conversion Table';
  tableButton.onclick = generateBaseConversionTable;
  buttonContainer.appendChild(tableButton);

  baseConverter.appendChild(buttonContainer);

  // Result container
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('result-container');

  const resultHeading = document.createElement('h1');
  resultHeading.textContent = 'Result';
  resultContainer.appendChild(resultHeading);

  const resultGroup = document.createElement('div');
  resultGroup.classList.add('result-group');

  const resultBase = document.createElement('div');
  resultBase.id = 'result-base';
  resultBase.innerHTML = '<h2>No Results</h2>';
  resultGroup.appendChild(resultBase);

  resultContainer.appendChild(resultGroup);

  // Add everything to base container
  baseConverterContainer.appendChild(baseConverter);
  baseConverterContainer.appendChild(resultContainer);

  // Append to base-converter-section
  const baseConverterSection = document.createElement('div');
  baseConverterSection.id = "base-converter-section";

  baseConverterSection.appendChild(baseConverterContainer);

  // create table container and append //
  const tableContainer = document.createElement("div");
  tableContainer.id = "table-container";
  baseConverterSection.appendChild(tableContainer);

  elements_container.append(baseConverterSection);
}

//----------------------------------------//
function convert() {
    let resultContainer = document.getElementById('result-base');
    resultContainer.innerHTML = "";
    // Get user input and selected bases
    const userInput = document.getElementById('number').value;
    const fromBaseElement = document.getElementById('fromBase');
    const toBaseElement = document.getElementById('toBase');

    const fromBase = parseInt(fromBaseElement.value, 10);
    const toBase = parseInt(toBaseElement.value, 10);

    // Get the unit name for the "From base"
    const fromBaseUnitName = fromBaseElement.options[fromBaseElement.selectedIndex].textContent;
    // Get the unit name for the "To base"
    const toBaseUnitName = toBaseElement.options[toBaseElement.selectedIndex].textContent;

    // Validate input
    if (!isValidInput(userInput, fromBase)) {
        setModalText("Warning", 'Please enter a valid number for the selected "From base".')
        return;
    }

    // Convert to decimal
    const decimalNumber = parseInt(userInput, fromBase);

    // Convert to the desired base
    const resultInToBase = decimalNumber.toString(toBase).toUpperCase();
    // Generate a table of chart for the selected base
    const table = generateTable(fromBase, toBase, fromBaseUnitName, toBaseUnitName);
    // Display the detailed result
    const detailedResult = `
       <p><strong>Decimal: </strong><span>${decimalNumber}</span></p>
       <p><strong>Base ${fromBase} (${fromBaseUnitName}): </strong><span>${userInput}<sub>${fromBase}</sub></span></p>
       <p><strong>Base ${toBase} ( ${toBaseUnitName}): </strong><span>${resultInToBase}<sub>${toBase}</sub></span></p>
    `;

    resultContainer.innerHTML = `${detailedResult}`;
    document.getElementById('table-container').innerHTML = `
                    <h1>Table of Chart</h1>
                     ${table}`;
}


function isValidInput(input, base) {
    const validChars = `0123456789ABCDEF`.substring(0, base);
    const regex = new RegExp(`^[${validChars}]+$`, 'i');
    return regex.test(input);
}

function generateTable(fromBase, toBase, fromBaseUnitName, toBaseUnitName) {
    let table = '<table>';
    table += `<tr><th>${fromBaseUnitName}</th><th>` + `${toBaseUnitName}` + '</th></tr>';
    
    for (let i = 0; i <= 20; i++) {
        const convertedNumber_from = i.toString(fromBase).toUpperCase();
        const convertedNumber_to = i.toString(toBase).toUpperCase();
        table += `<tr><td>${convertedNumber_from}<sub>${fromBase}</sub></td><td>${convertedNumber_to}<sub>${toBase}</sub></td></tr>`;
    }

    table += '</table>';
    return table;
}

//------------------------------------------//
function generateBaseConversionTable() {
  let tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = "";
    
  let tableHTML = '<table border="1"><thead><tr><th>Decimal (Base 10)</th><th>Binary (Base 2)</th><th>Octal (Base 8)</th><th>Hexadecimal (Base 16)</th></tr></thead><tbody>';

  for (let i = 1; i <= 20; i++) {
    let decimal = i;
    let binary = decimal.toString(2);
    let octal = decimal.toString(8);
    let hexadecimal = decimal.toString(16).toUpperCase();

    tableHTML += `<tr><td>${decimal}<sub>10</sub></td><td>${binary}<sub>2</sub></td><td>${octal}<sub>8</sub></td><td>${hexadecimal}<sub>16</sub></td></tr>`;
  }

  tableHTML += '</tbody></table>';

  tableContainer.innerHTML = `
                    <h1>Base Conversion Table</h1>
                     ${tableHTML}`;;
}
