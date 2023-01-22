/*TODO: aggregate the nutrition information

input: ingredients
output: object {
    foodNutrients : {....}
    totalWeight: 
}
*/
const MEASURE_BY_SERVING = 0;

const GRAM_WEIGHT_OF_NUTRITION_READINGS = 100;

function getGramWeightOfServingMeasurement(ingredient: any) {

    return Number(ingredient.servingUnitInput) * ingredient.foodInformation.foodMeasures[ingredient.selectedFoodMeasure].gramWeight;

}

function aggregateNutrition(ingredients: any) {

    let aggregate = {
        gramWeight: 0
    };

    ingredients.forEach((ingredient) => {


        //confirm with 1 more ingredient that nutrient information is based off of 100g...

        //get number of servings
        const numberOfGrams = (assertValidFoodMeasure(ingredient.selectedFoodMeasure) === MEASURE_BY_SERVING)
            ? getGramWeightOfServingMeasurement(ingredient) : ingredient.servingUnitInput;
        
        aggregate['gramWeight'] += numberOfGrams;

        const nutritionInformationMultiplier = numberOfGrams / GRAM_WEIGHT_OF_NUTRITION_READINGS;

        ingredient.foodInformation.foodNutrients.forEach((nutrient) => {
            if (aggregate[nutrient.foodNutrientId] === undefined) {

                aggregate[nutrient.foodNutrientId] = structuredClone(nutrient);

                const nutrientValue = aggregate[nutrient.foodNutrientId].value;
                aggregate[nutrient.foodNutrientId].value = nutrientValue * nutritionInformationMultiplier;
            } else {

                assertNutrientHasSameUnitName(aggregate, nutrient);
                const nutrientValue = nutrient.value * nutritionInformationMultiplier;

                aggregate[nutrient.foodNutrientId].value += nutrientValue;
            }
        });

    });

    console.log(aggregate);

    return 0;
}

function assertValidFoodMeasure(foodMeasure) {
    if (foodMeasure > 1) alertAndThrow('Invalid food measure!');

    return foodMeasure;
}

function assertNutrientHasSameUnitName(aggregate, nutrient){
    const currentUnitOfMeasure = aggregate[nutrient.foodNutrientId].unitName;
    const newNutrientUnitOfMeasure = nutrient.unitName;

    if(currentUnitOfMeasure !== newNutrientUnitOfMeasure) alertAndThrow("We cant the same nutrient with different units of measure! Unable to convert!")

}

function alertAndThrow(message) {
    alert(message);

    throw message;
}

export default aggregateNutrition;