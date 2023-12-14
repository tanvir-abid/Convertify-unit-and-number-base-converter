// create all the html emelents //
function generateUnitConverterHTML() {
  const elements_container = document.getElementById("elements-container");
  elements_container.innerHTML = "";
  // Create main elements
  const unitConverterContainer = document.createElement('div');
  unitConverterContainer.classList.add('unit-converter-container');

  const converterContainer = document.createElement('div');
  converterContainer.classList.add('converter-container');

  const h1 = document.createElement('h1');
  h1.textContent = 'Unit Converter';

  const inputGroupContainer = document.createElement('div');
  inputGroupContainer.classList.add('input-group-container');

  // Create and append elements for Category dropdown
  const inputGroupCategory = document.createElement('div');
  inputGroupCategory.classList.add('input-group');
  const labelCategory = document.createElement('label');
  labelCategory.setAttribute('for', 'category');
  labelCategory.textContent = 'Category:';
  const selectCategory = document.createElement('select');
  selectCategory.id = 'category';
  const categories = ['Length', 'Distance', 'Volume', 'Area', 'Mass', 'Speed'];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    selectCategory.appendChild(option);
  });
  selectCategory.addEventListener('change', populateUnits);
  inputGroupCategory.appendChild(labelCategory);
  inputGroupCategory.appendChild(selectCategory);

  // Create and append elements for From Unit dropdown
  const inputGroupFromUnit = document.createElement('div');
  inputGroupFromUnit.classList.add('input-group');
  const labelFromUnit = document.createElement('label');
  labelFromUnit.setAttribute('for', 'fromUnit');
  labelFromUnit.textContent = 'From Unit:';
  const selectFromUnit = document.createElement('select');
  selectFromUnit.id = 'fromUnit';
  // Options for From Unit based on selected category will be added dynamically
  inputGroupFromUnit.appendChild(labelFromUnit);
  inputGroupFromUnit.appendChild(selectFromUnit);

  // Create and append elements for Value input and Switch button
  const inputGroupValue = document.createElement('div');
  inputGroupValue.classList.add('horizontal');
  const inputGroupValueInput = document.createElement('div');
  inputGroupValueInput.classList.add('input-group');
  const labelValue = document.createElement('label');
  labelValue.setAttribute('for', 'value');
  labelValue.textContent = 'Value:';
  const inputValue = document.createElement('input');
  inputValue.type = 'number';
  inputValue.id = 'value';
  inputValue.placeholder = 'Enter value';
  const inputGroupSwitch = document.createElement('div');
  inputGroupSwitch.classList.add('input-group', 'switch');
  const switchButton = document.createElement('button');
  switchButton.id = 'switchUnits';
  switchButton.innerHTML = '<span>&#8645;</span>';

  inputGroupValueInput.appendChild(labelValue);
  inputGroupValueInput.appendChild(inputValue);
  inputGroupSwitch.appendChild(switchButton);
  inputGroupValue.appendChild(inputGroupValueInput);
  inputGroupValue.appendChild(inputGroupSwitch);

  // Create and append elements for To Unit dropdown
  const inputGroupToUnit = document.createElement('div');
  inputGroupToUnit.classList.add('input-group');
  const labelToUnit = document.createElement('label');
  labelToUnit.setAttribute('for', 'toUnit');
  labelToUnit.textContent = 'To Unit:';
  const selectToUnit = document.createElement('select');
  selectToUnit.id = 'toUnit';
  // Options for To Unit based on selected category will be added dynamically
  inputGroupToUnit.appendChild(labelToUnit);
  inputGroupToUnit.appendChild(selectToUnit);

    // Add click event to switchButton
    switchButton.addEventListener('click', switchUnits);

  // Create and append Convert button
  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');
  const convertButton = document.createElement('button');
  convertButton.textContent = 'Convert';
  convertButton.addEventListener('click', convertUnits);
  btnGroup.appendChild(convertButton);

  // Append input groups to input group container
  inputGroupContainer.appendChild(inputGroupCategory);
  inputGroupContainer.appendChild(inputGroupFromUnit);
  inputGroupContainer.appendChild(inputGroupValue);
  inputGroupContainer.appendChild(inputGroupToUnit);
  inputGroupContainer.appendChild(btnGroup);

  // Append elements to their respective parent elements
  converterContainer.appendChild(h1);
  converterContainer.appendChild(inputGroupContainer);

  unitConverterContainer.appendChild(converterContainer);

  // Create and append result container elements
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('result-container');
  const resultContents = document.createElement('div');
  resultContents.classList.add('result-contents');
  const h1Results = document.createElement('h1');
  h1Results.textContent = 'Results';
  const divResult = document.createElement('div');
  divResult.id = 'result';
  const h3NoResults = document.createElement('h3');
  h3NoResults.textContent = 'No Results';
  divResult.appendChild(h3NoResults);
  const divPrintUnitList = document.createElement('div');
  divPrintUnitList.id = 'printUnitList';
  
  resultContents.appendChild(h1Results);
  resultContents.appendChild(divResult);
  resultContents.appendChild(divPrintUnitList);

  resultContainer.appendChild(resultContents);
  unitConverterContainer.append(resultContainer);

  // Append generated HTML to the element with ID 'unit-converter'
  const unitConverterElement = document.createElement('div');
  unitConverterElement.id = "unit-converter";

  unitConverterElement.appendChild(unitConverterContainer);
  elements_container.append(unitConverterElement);

  populateUnits();
}

//-----------------------------------------//
// Define units for each category
const units = {
  Length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
  Mass: ['Gram', 'Kilogram', 'Milligram', 'MetricTon', 'Ounce', 'Pound', 'Stone', 'Ton', 'ShortTon', 'LongTon', 'Carat', 'AtomicMassUnit', 'Grain', 'TroyOunce', 'TroyPound'],
  Area: ['SquareMeter', 'SquareKilometer', 'SquareCentimeter', 'SquareMillimeter', 'SquareMile', 'SquareYard', 'SquareFoot', 'Acre', 'Hectare', 'SquareInch'],
  Volume: ['Liter', 'Gallon', 'CubicMeter', 'Milliliter', 'CubicFoot', 'CubicInch', 'FluidOunce', 'Pint', 'Quart', 'Barrel'],
  Speed: ['MetersPerSecond', 'MetersPerHour', 'KilometersPerSecond', 'KilometersPerHour', 'FeetPerHour', 'FeetPerSecond', 'MilesPerSecond', 'MilesPerHour', 'Knots'],
  Distance: ['Meter', 'Kilometer', 'Mile', 'Yard', 'Foot', 'Inch']
  // Add units for other categories as needed
};

// Function to populate unit options based on the selected category
function populateUnits() {
  const category = document.getElementById('category').value;
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');

  // Clear previous options
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';

  // Get units for the selected category
  const categoryUnits = units[category];

  // Populate fromUnit select element
  categoryUnits.forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit;
    option1.text = unit;
    fromUnitSelect.appendChild(option1);
  });

  // Reverse the order of categoryUnits for toUnit select element
  const reversedUnits = categoryUnits.slice().reverse();

  // Populate toUnit select element
  reversedUnits.forEach(unit => {
    const option2 = document.createElement('option');
    option2.value = unit;
    option2.text = unit;
    toUnitSelect.appendChild(option2);
  });
}


function switchUnits() {
  // Get the selected units
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');

  // Swap the selected units using a temporary variable
  const tempUnit = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;
}

//------------------------------------------//
// Define conversion factors for different units
const conversionFactors = {
  Length: {
    Meter: 1,
    Kilometer: 0.001,
    Centimeter: 100,
    Millimeter: 1000,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084,
    Inch: 39.3701
  },
  Distance: {
    Meter: 1,
    Kilometer: 0.001,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084,
    Inch: 39.3701
  },
  Mass: {
    Gram: 1,
    Kilogram: 0.001,
    Milligram: 1000,
    MetricTon: 0.000001,
    Ounce: 0.03527396,
    Pound: 0.002204623,
    Stone: 0.000157473,
    Ton: 0.0000011023,
    ShortTon: 1.1023e-6,
    LongTon: 9.8421e-7,
    Carat: 5,
    AtomicMassUnit: 6.0221e+23,
    Grain: 15.4324,
    TroyOunce: 0.0321507,
    TroyPound: 0.00267923
    // Add more units and their conversion factors here
  },
  Area: {
    SquareMeter: 1,
    SquareKilometer: 0.000001,
    SquareCentimeter: 10000,
    SquareMillimeter: 1000000,
    SquareMile: 3.861e-7,
    SquareYard: 1.19599,
    SquareFoot: 10.7639,
    Acre: 0.000247105,
    Hectare: 0.0001,
    SquareInch: 1550.0031
  },
  Volume: {
    Liter: 1,
    Gallon: 0.264172,
    CubicMeter: 0.001,
    Milliliter: 1000,
    CubicFoot: 0.0353147,
    CubicInch: 61.0237,
    FluidOunce: 33.814,
    Pint: 2.11338,
    Quart: 1.05669,
    Barrel: 0.00838641
  },
  Speed: {
    MetersPerSecond: 1,
    MetersPerHour: 3600,
    KilometersPerSecond: 0.001,
    KilometersPerHour: 3.6,
    FeetPerHour: 11811.0236,
    FeetPerSecond: 3.28084,
    MilesPerSecond: 0.000621371,
    MilesPerHour: 2.23694,
    Knots: 1.94384,
  }
};
// function to convert according to the user's inputs //
// and display the converted result //
function convertUnits() {
  const selectedConversionType = document.getElementById('category').value;
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const inputValue = parseFloat(document.getElementById('value').value);
  const resultElement = document.getElementById('result');
  
  if (!isNaN(inputValue)) {
    if (fromUnit === toUnit) {
      setModalText("Warning", "<p>You have selected same units. Please select different units to convert.")
      return;
    }

    const conversionFactor = conversionFactors[selectedConversionType][toUnit] / conversionFactors[selectedConversionType][fromUnit];
    const convertedValue = inputValue * conversionFactor;
    
    const conversionDescription = `1 ${fromUnit} = ${conversionFactor.toFixed(2)} ${toUnit}`;
    const inputDescription = `${inputValue} ${fromUnit}`;
    const resultDescription = `${convertedValue.toFixed(2)} ${toUnit}`;

    const htmlResult = `
      <p><strong>Value of per unit:</strong> <span>${conversionDescription}</span></p>
      <p><strong>Your Input:</strong> <span>${inputDescription}</span></p>
      <p><strong>Converted Result:</strong> <span>${resultDescription}</span></p>
    `;

    resultElement.innerHTML = htmlResult;

    generateUnitList();
  } else {
    setModalText("Warning", "Please enter a valid positive number.")
  }
}

//--------------------------------//
// generate a list of factors in respect of from unit and to unit //
function generateUnitList() {
  const selectedConversionType = document.getElementById('category').value;
  const baseUnit = document.getElementById('fromUnit').value;

  const unitList = document.createElement("ul"); // Create ul element
  unitList.classList.add("unit-list"); // Optional: Add a class to the ul element

  for (const unit in conversionFactors[selectedConversionType]) {
    if (unit !== baseUnit) {
      const conversionFactor = conversionFactors[selectedConversionType][unit] / conversionFactors[selectedConversionType][baseUnit];
      const conversionText = `1 ${baseUnit} = ${conversionFactor.toFixed(3)} ${unit}`;
      const listItem = document.createElement("li");
      listItem.textContent = conversionText;
      unitList.appendChild(listItem);
    }
  }

  const printUnitList = document.getElementById("printUnitList");
  printUnitList.innerHTML = ""; 
  const heading = document.createElement("h1");
  heading.textContent = "List of Unit";
  printUnitList.appendChild(heading); // Append heading
  printUnitList.appendChild(unitList); // Append the ul to printUnitList div
}

