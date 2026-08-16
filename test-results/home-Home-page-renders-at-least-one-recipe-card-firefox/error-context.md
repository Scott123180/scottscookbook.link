# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home page >> renders at least one recipe card
- Location: e2e/home.spec.ts:27:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[class*="MuiCard-root"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[class*="MuiCard-root"]').first()

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - navigation "Primary" [ref=e6]:
      - link "Scott’s Cookbook" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: S
      - list [ref=e10]:
        - listitem [ref=e11]:
          - link "Cooking Tools" [ref=e12] [cursor=pointer]:
            - /url: /tools/
        - listitem [ref=e13]:
          - link "About" [ref=e14] [cursor=pointer]:
            - /url: /about/
  - main [ref=e15]:
    - generic [ref=e17]:
      - heading "A personal, ad-free cookbook." [level=1] [ref=e18]
      - paragraph [ref=e19]: Recipes I've actually made, rated honestly, with shopping-list links and a cooking mode that keeps your screen awake.
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e24]:
          - textbox "Search title, ingredient, or step…" [ref=e28]
          - group
        - generic [ref=e29]:
          - paragraph [ref=e30]: "Sort:"
          - generic [ref=e31]:
            - combobox [ref=e32] [cursor=pointer]: Rating (high → low)
            - textbox: rating
            - group
      - group [ref=e33]:
        - button "All" [pressed] [ref=e34] [cursor=pointer]
        - button "Side Dish" [ref=e35] [cursor=pointer]
        - button "Salad" [ref=e36] [cursor=pointer]
        - button "Main Dish" [ref=e37] [cursor=pointer]
        - button "Soup" [ref=e38] [cursor=pointer]
        - button "Sauce" [ref=e39] [cursor=pointer]
        - button "Fermentation" [ref=e40] [cursor=pointer]
        - button "Snack" [ref=e41] [cursor=pointer]
        - button "Dessert" [ref=e42] [cursor=pointer]
        - button "One-Pot" [ref=e43] [cursor=pointer]
      - generic [ref=e44]:
        - link "Side Dish Instant Pot Brown Rice 21 min 5 Stars" [ref=e47] [cursor=pointer]:
          - /url: /recipes/InstantPotBrownRice/
          - generic [ref=e48]: Side Dish
          - generic [ref=e52]:
            - heading "Instant Pot Brown Rice" [level=6] [ref=e53]
            - generic [ref=e54]:
              - generic [ref=e55]: 21 min
              - img "5 Stars"
        - link "Salad Four Bean Salad 15 min + overnight chilling 5 Stars" [ref=e62] [cursor=pointer]:
          - /url: /recipes/FourBeanSalad/
          - generic [ref=e63]: Salad
          - generic [ref=e67]:
            - heading "Four Bean Salad" [level=6] [ref=e68]
            - generic [ref=e69]:
              - generic [ref=e70]: 15 min + overnight chilling
              - img "5 Stars"
        - link "Salad Mediterranean Bean Salad 20 min 5 Stars" [ref=e77] [cursor=pointer]:
          - /url: /recipes/MediterraneanBeanSalad/
          - generic [ref=e78]: Salad
          - generic [ref=e82]:
            - heading "Mediterranean Bean Salad" [level=6] [ref=e83]
            - generic [ref=e84]:
              - generic [ref=e85]: 20 min
              - img "5 Stars"
        - link "Salad Three Bean Salad 20 min + overnight chilling 5 Stars" [ref=e92] [cursor=pointer]:
          - /url: /recipes/ThreeBeanSalad/
          - generic [ref=e93]: Salad
          - generic [ref=e97]:
            - heading "Three Bean Salad" [level=6] [ref=e98]
            - generic [ref=e99]:
              - generic [ref=e100]: 20 min + overnight chilling
              - img "5 Stars"
        - link "Side Dish Lemon-Garlic Lima Beans 1 hr 30 min + soaking time 5 Stars" [ref=e107] [cursor=pointer]:
          - /url: /recipes/LemonGarlicLimaBeans/
          - generic [ref=e108]: Side Dish
          - generic [ref=e112]:
            - heading "Lemon-Garlic Lima Beans" [level=6] [ref=e113]
            - generic [ref=e114]:
              - generic [ref=e115]: 1 hr 30 min + soaking time
              - img "5 Stars"
        - link "Spicy Thai Noodles 15 min 5 Stars" [ref=e122] [cursor=pointer]:
          - /url: /recipes/SpicyThaiNoodles/
          - generic [ref=e125]:
            - heading "Spicy Thai Noodles" [level=6] [ref=e126]
            - generic [ref=e127]:
              - generic [ref=e128]: 15 min
              - img "5 Stars"
        - link "Main Dish Lentil Loaf 80 min 5 Stars" [ref=e135] [cursor=pointer]:
          - /url: /recipes/LentilLoaf/
          - generic [ref=e136]: Main Dish
          - generic [ref=e140]:
            - heading "Lentil Loaf" [level=6] [ref=e141]
            - generic [ref=e142]:
              - generic [ref=e143]: 80 min
              - img "5 Stars"
        - link "Sauce Easy Beef Gravy 20 min 5 Stars" [ref=e150] [cursor=pointer]:
          - /url: /recipes/EasyBeefGravy/
          - generic [ref=e151]: Sauce
          - generic [ref=e155]:
            - heading "Easy Beef Gravy" [level=6] [ref=e156]
            - generic [ref=e157]:
              - generic [ref=e158]: 20 min
              - img "5 Stars"
        - link "Fermentation Fermented Dilly Beans 7 days 15 min 5 Stars" [ref=e165] [cursor=pointer]:
          - /url: /recipes/FermentedDillyBeans/
          - generic [ref=e166]: Fermentation
          - generic [ref=e170]:
            - heading "Fermented Dilly Beans" [level=6] [ref=e171]
            - generic [ref=e172]:
              - generic [ref=e173]: 7 days 15 min
              - img "5 Stars"
        - link "Hard Cooked (Steamed) Eggs 33 min 5 Stars" [ref=e180] [cursor=pointer]:
          - /url: /recipes/HardCookedEggs/
          - generic [ref=e183]:
            - heading "Hard Cooked (Steamed) Eggs" [level=6] [ref=e184]
            - generic [ref=e185]:
              - generic [ref=e186]: 33 min
              - img "5 Stars"
        - link "Masoor Dal (Spiced Red Lentils) 45 min 5 Stars" [ref=e193] [cursor=pointer]:
          - /url: /recipes/MasoorDal/
          - generic [ref=e196]:
            - heading "Masoor Dal (Spiced Red Lentils)" [level=6] [ref=e197]
            - generic [ref=e198]:
              - generic [ref=e199]: 45 min
              - img "5 Stars"
        - link "Snack Pickled Eggs 3 days 15 min 5 Stars" [ref=e206] [cursor=pointer]:
          - /url: /recipes/PickledEggs/
          - generic [ref=e207]: Snack
          - generic [ref=e211]:
            - heading "Pickled Eggs" [level=6] [ref=e212]
            - generic [ref=e213]:
              - generic [ref=e214]: 3 days 15 min
              - img "5 Stars"
        - link "Soup White Bean, Rice, and Dill Soup 45 min 5 Stars" [ref=e221] [cursor=pointer]:
          - /url: /recipes/WhiteBeanRiceAndDillSoup/
          - generic [ref=e222]: Soup
          - generic [ref=e226]:
            - heading "White Bean, Rice, and Dill Soup" [level=6] [ref=e227]
            - generic [ref=e228]:
              - generic [ref=e229]: 45 min
              - img "5 Stars"
        - link "Soup Carrot Ginger Soup (Served Hot or Cold) 40 minutes 5 Stars" [ref=e236] [cursor=pointer]:
          - /url: /recipes/CarrotGingerSoup/
          - generic [ref=e237]: Soup
          - generic [ref=e241]:
            - heading "Carrot Ginger Soup (Served Hot or Cold)" [level=6] [ref=e242]
            - generic [ref=e243]:
              - generic [ref=e244]: 40 minutes
              - img "5 Stars"
        - link "Fermentation Fermented Beans 4 to 5 days 20 min 5 Stars" [ref=e251] [cursor=pointer]:
          - /url: /recipes/FermentedBeans/
          - generic [ref=e252]: Fermentation
          - generic [ref=e256]:
            - heading "Fermented Beans" [level=6] [ref=e257]
            - generic [ref=e258]:
              - generic [ref=e259]: 4 to 5 days 20 min
              - img "5 Stars"
        - link "Fermentation Fermented Carrots 5–10 days 15 min 5 Stars" [ref=e266] [cursor=pointer]:
          - /url: /recipes/FermentedCarrots/
          - generic [ref=e267]: Fermentation
          - generic [ref=e271]:
            - heading "Fermented Carrots" [level=6] [ref=e272]
            - generic [ref=e273]:
              - generic [ref=e274]: 5–10 days 15 min
              - img "5 Stars"
        - link "Fermentation Traditional Sauerkraut 14 days 5 Stars" [ref=e281] [cursor=pointer]:
          - /url: /recipes/Sauerkraut/
          - generic [ref=e282]: Fermentation
          - generic [ref=e286]:
            - heading "Traditional Sauerkraut" [level=6] [ref=e287]
            - generic [ref=e288]:
              - generic [ref=e289]: 14 days
              - img "5 Stars"
        - link "Salad Three Ingredient Mediterranean Salad 15 min 5 Stars" [ref=e296] [cursor=pointer]:
          - /url: /recipes/ThreeIngrediantMediterraneanSalad/
          - generic [ref=e297]: Salad
          - generic [ref=e301]:
            - heading "Three Ingredient Mediterranean Salad" [level=6] [ref=e302]
            - generic [ref=e303]:
              - generic [ref=e304]: 15 min
              - img "5 Stars"
        - link "Main Dish Instant Pot Pork Loin 50 min 5 Stars" [ref=e311] [cursor=pointer]:
          - /url: /recipes/InstantPotPorkLoin/
          - generic [ref=e312]: Main Dish
          - generic [ref=e316]:
            - heading "Instant Pot Pork Loin" [level=6] [ref=e317]
            - generic [ref=e318]:
              - generic [ref=e319]: 50 min
              - img "5 Stars"
        - link "Chicken Enchiladas 75 min 5 Stars" [ref=e326] [cursor=pointer]:
          - /url: /recipes/ChickenEnchiladas/
          - generic [ref=e329]:
            - heading "Chicken Enchiladas" [level=6] [ref=e330]
            - generic [ref=e331]:
              - generic [ref=e332]: 75 min
              - img "5 Stars"
        - link "Snack Cowboy Caviar 15 min 5 Stars" [ref=e339] [cursor=pointer]:
          - /url: /recipes/CowboyCaviar/
          - generic [ref=e340]: Snack
          - generic [ref=e344]:
            - heading "Cowboy Caviar" [level=6] [ref=e345]
            - generic [ref=e346]:
              - generic [ref=e347]: 15 min
              - img "5 Stars"
        - link "Salad Black Bean Salad 20 min 5 Stars" [ref=e354] [cursor=pointer]:
          - /url: /recipes/BlackBeanSalad/
          - generic [ref=e355]: Salad
          - generic [ref=e359]:
            - heading "Black Bean Salad" [level=6] [ref=e360]
            - generic [ref=e361]:
              - generic [ref=e362]: 20 min
              - img "5 Stars"
        - link "Fermentation Easy Homemade Kimchi 4–7 days 5 Stars" [ref=e369] [cursor=pointer]:
          - /url: /recipes/EasyHomemadeKimchi/
          - generic [ref=e370]: Fermentation
          - generic [ref=e374]:
            - heading "Easy Homemade Kimchi" [level=6] [ref=e375]
            - generic [ref=e376]:
              - generic [ref=e377]: 4–7 days
              - img "5 Stars"
        - link "Soup Restaurant-Style Miso Ramen 80 min 5 Stars" [ref=e384] [cursor=pointer]:
          - /url: /recipes/ChickenMisoRamen/
          - generic [ref=e385]: Soup
          - generic [ref=e389]:
            - heading "Restaurant-Style Miso Ramen" [level=6] [ref=e390]
            - generic [ref=e391]:
              - generic [ref=e392]: 80 min
              - img "5 Stars"
        - link "Soup Split Pea Soup without Pork 2 hrs 15 min 5 Stars" [ref=e399] [cursor=pointer]:
          - /url: /recipes/SplitPeaSoupWithoutPork/
          - generic [ref=e400]: Soup
          - generic [ref=e404]:
            - heading "Split Pea Soup without Pork" [level=6] [ref=e405]
            - generic [ref=e406]:
              - generic [ref=e407]: 2 hrs 15 min
              - img "5 Stars"
        - link "Spanish Pinto Bean Stew | Potaje de Alubias Pintas 45 min 5 Stars" [ref=e414] [cursor=pointer]:
          - /url: /recipes/SpanishPintoBeanStew/
          - generic [ref=e417]:
            - heading "Spanish Pinto Bean Stew | Potaje de Alubias Pintas" [level=6] [ref=e418]
            - generic [ref=e419]:
              - generic [ref=e420]: 45 min
              - img "5 Stars"
        - link "Salad Asian Edamame Bean Salad 70 min 5 Stars" [ref=e427] [cursor=pointer]:
          - /url: /recipes/AsianEdamameBeanSalad/
          - generic [ref=e428]: Salad
          - generic [ref=e432]:
            - heading "Asian Edamame Bean Salad" [level=6] [ref=e433]
            - generic [ref=e434]:
              - generic [ref=e435]: 70 min
              - img "5 Stars"
        - link "Tofu Tacos 45 min 5 Stars" [ref=e442] [cursor=pointer]:
          - /url: /recipes/TofuTacos/
          - generic [ref=e445]:
            - heading "Tofu Tacos" [level=6] [ref=e446]
            - generic [ref=e447]:
              - generic [ref=e448]: 45 min
              - img "5 Stars"
        - link "Whole Wheat Pancakes 30 min 5 Stars" [ref=e455] [cursor=pointer]:
          - /url: /recipes/WholeWheatPancakes/
          - generic [ref=e458]:
            - heading "Whole Wheat Pancakes" [level=6] [ref=e459]
            - generic [ref=e460]:
              - generic [ref=e461]: 30 min
              - img "5 Stars"
        - link "Vegan Cheesy Pasta Sauce (Cashew Alfredo) 25 min 5 Stars" [ref=e468] [cursor=pointer]:
          - /url: /recipes/VeganCheesyPastaSauceCashewAlfredo/
          - generic [ref=e471]:
            - heading "Vegan Cheesy Pasta Sauce (Cashew Alfredo)" [level=6] [ref=e472]
            - generic [ref=e473]:
              - generic [ref=e474]: 25 min
              - img "5 Stars"
        - link "Main Dish Baked Chicken with Pesto 30 min 5 Stars" [ref=e481] [cursor=pointer]:
          - /url: /recipes/BakedChickenPesto/
          - generic [ref=e482]: Main Dish
          - generic [ref=e486]:
            - heading "Baked Chicken with Pesto" [level=6] [ref=e487]
            - generic [ref=e488]:
              - generic [ref=e489]: 30 min
              - img "5 Stars"
        - link "Sauce Walnut Pesto 10 min 5 Stars" [ref=e496] [cursor=pointer]:
          - /url: /recipes/WalnutPesto/
          - generic [ref=e497]: Sauce
          - generic [ref=e501]:
            - heading "Walnut Pesto" [level=6] [ref=e502]
            - generic [ref=e503]:
              - generic [ref=e504]: 10 min
              - img "5 Stars"
        - link "Greek Pasta Salad 25 min 5 Stars" [ref=e511] [cursor=pointer]:
          - /url: /recipes/GreekPastaSalad/
          - generic [ref=e514]:
            - heading "Greek Pasta Salad" [level=6] [ref=e515]
            - generic [ref=e516]:
              - generic [ref=e517]: 25 min
              - img "5 Stars"
        - link "Side Dish Instant Pot Quinoa 25 min 5 Stars" [ref=e524] [cursor=pointer]:
          - /url: /recipes/InstantPotQuinoa/
          - generic [ref=e525]: Side Dish
          - generic [ref=e529]:
            - heading "Instant Pot Quinoa" [level=6] [ref=e530]
            - generic [ref=e531]:
              - generic [ref=e532]: 25 min
              - img "5 Stars"
        - link "Salad Simple White Bean Salad 30 min 5 Stars" [ref=e539] [cursor=pointer]:
          - /url: /recipes/SimpleWhiteBeanSalad/
          - generic [ref=e540]: Salad
          - generic [ref=e544]:
            - heading "Simple White Bean Salad" [level=6] [ref=e545]
            - generic [ref=e546]:
              - generic [ref=e547]: 30 min
              - img "5 Stars"
        - link "Vegetable Broth 1 hr 10 min 5 Stars" [ref=e554] [cursor=pointer]:
          - /url: /recipes/VeggieBroth/
          - generic [ref=e557]:
            - heading "Vegetable Broth" [level=6] [ref=e558]
            - generic [ref=e559]:
              - generic [ref=e560]: 1 hr 10 min
              - img "5 Stars"
        - link "Apple Butter 8 hours 20 minutes 5 Stars" [ref=e567] [cursor=pointer]:
          - /url: /recipes/AppleButter/
          - generic [ref=e570]:
            - heading "Apple Butter" [level=6] [ref=e571]
            - generic [ref=e572]:
              - generic [ref=e573]: 8 hours 20 minutes
              - img "5 Stars"
        - link "Lentil Soup 60 min 5 Stars" [ref=e580] [cursor=pointer]:
          - /url: /recipes/LentilSoup/
          - generic [ref=e583]:
            - heading "Lentil Soup" [level=6] [ref=e584]
            - generic [ref=e585]:
              - generic [ref=e586]: 60 min
              - img "5 Stars"
        - link "Mjadra (Lentils and Rice) 9 hours 20 min 5 Stars" [ref=e593] [cursor=pointer]:
          - /url: /recipes/Mjadra/
          - generic [ref=e596]:
            - heading "Mjadra (Lentils and Rice)" [level=6] [ref=e597]
            - generic [ref=e598]:
              - generic [ref=e599]: 9 hours 20 min
              - img "5 Stars"
        - link "Back Pocket Stir Fry 40 min 5 Stars" [ref=e606] [cursor=pointer]:
          - /url: /recipes/BackPocketStirFry/
          - generic [ref=e609]:
            - heading "Back Pocket Stir Fry" [level=6] [ref=e610]
            - generic [ref=e611]:
              - generic [ref=e612]: 40 min
              - img "5 Stars"
        - link "Main Dish Slow Cooker Chili 4 hours 15 min - 6 hours 15 min 5 Stars" [ref=e619] [cursor=pointer]:
          - /url: /recipes/SlowCookerChile/
          - generic [ref=e620]: Main Dish
          - generic [ref=e624]:
            - heading "Slow Cooker Chili" [level=6] [ref=e625]
            - generic [ref=e626]:
              - generic [ref=e627]: 4 hours 15 min - 6 hours 15 min
              - img "5 Stars"
        - link "Side Dish Braised Lentils 55 min 5 Stars" [ref=e634] [cursor=pointer]:
          - /url: /recipes/BraisedLentils/
          - generic [ref=e635]: Side Dish
          - generic [ref=e639]:
            - heading "Braised Lentils" [level=6] [ref=e640]
            - generic [ref=e641]:
              - generic [ref=e642]: 55 min
              - img "5 Stars"
        - link "Main Dish Vegan Mushroom Stew 45 min 4.5 Stars" [ref=e649] [cursor=pointer]:
          - /url: /recipes/VeganMushroomStew/
          - generic [ref=e650]: Main Dish
          - generic [ref=e654]:
            - heading "Vegan Mushroom Stew" [level=6] [ref=e655]
            - generic [ref=e656]:
              - generic [ref=e657]: 45 min
              - img "4.5 Stars"
        - link "Salad Classic Chicken Salad 15 min 4.5 Stars" [ref=e664] [cursor=pointer]:
          - /url: /recipes/ClassicChickenSalad/
          - generic [ref=e665]: Salad
          - generic [ref=e669]:
            - heading "Classic Chicken Salad" [level=6] [ref=e670]
            - generic [ref=e671]:
              - generic [ref=e672]: 15 min
              - img "4.5 Stars"
        - link "Instant Pot Spinach Artichoke Chicken 1 hr 4.5 Stars" [ref=e679] [cursor=pointer]:
          - /url: /recipes/InstantPotSpinachArtichokeChicken/
          - generic [ref=e682]:
            - heading "Instant Pot Spinach Artichoke Chicken" [level=6] [ref=e683]
            - generic [ref=e684]:
              - generic [ref=e685]: 1 hr
              - img "4.5 Stars"
        - link "Salad Vegetable Quinoa Salad 50 min 4.5 Stars" [ref=e692] [cursor=pointer]:
          - /url: /recipes/VegetableQuinoaSalad/
          - generic [ref=e693]: Salad
          - generic [ref=e697]:
            - heading "Vegetable Quinoa Salad" [level=6] [ref=e698]
            - generic [ref=e699]:
              - generic [ref=e700]: 50 min
              - img "4.5 Stars"
        - link "Side Dish Lemon Basil Pasta Salad 2 hrs 17 min 4.5 Stars" [ref=e707] [cursor=pointer]:
          - /url: /recipes/LemonBasilPastaSalad/
          - generic [ref=e708]: Side Dish
          - generic [ref=e712]:
            - heading "Lemon Basil Pasta Salad" [level=6] [ref=e713]
            - generic [ref=e714]:
              - generic [ref=e715]: 2 hrs 17 min
              - img "4.5 Stars"
        - link "Salad Pinto Bean Salad 50 min 4.5 Stars" [ref=e722] [cursor=pointer]:
          - /url: /recipes/PintoBeanSalad/
          - generic [ref=e723]: Salad
          - generic [ref=e727]:
            - heading "Pinto Bean Salad" [level=6] [ref=e728]
            - generic [ref=e729]:
              - generic [ref=e730]: 50 min
              - img "4.5 Stars"
        - link "Salad Mediterranean Lentil Salad 35 min 4.5 Stars" [ref=e737] [cursor=pointer]:
          - /url: /recipes/MediterraneanLentilSalad/
          - generic [ref=e738]: Salad
          - generic [ref=e742]:
            - heading "Mediterranean Lentil Salad" [level=6] [ref=e743]
            - generic [ref=e744]:
              - generic [ref=e745]: 35 min
              - img "4.5 Stars"
        - link "Salad Roasted Beet and Egg Salad with Rye Croutons 55 min 4 Stars" [ref=e752] [cursor=pointer]:
          - /url: /recipes/RoastedBeetAndEggSaladWithRyeCroutons/
          - generic [ref=e753]: Salad
          - generic [ref=e757]:
            - heading "Roasted Beet and Egg Salad with Rye Croutons" [level=6] [ref=e758]
            - generic [ref=e759]:
              - generic [ref=e760]: 55 min
              - img "4 Stars"
        - link "Soup Spicy Black Bean Soup 60 min 4 Stars" [ref=e767] [cursor=pointer]:
          - /url: /recipes/SpicyBlackBeanSoup/
          - generic [ref=e768]: Soup
          - generic [ref=e772]:
            - heading "Spicy Black Bean Soup" [level=6] [ref=e773]
            - generic [ref=e774]:
              - generic [ref=e775]: 60 min
              - img "4 Stars"
        - link "Soup Pasta And Kidney Bean Soup 60 min 4 Stars" [ref=e782] [cursor=pointer]:
          - /url: /recipes/PastaAndWhiteBeanSoup/
          - generic [ref=e783]: Soup
          - generic [ref=e787]:
            - heading "Pasta And Kidney Bean Soup" [level=6] [ref=e788]
            - generic [ref=e789]:
              - generic [ref=e790]: 60 min
              - img "4 Stars"
        - link "Main Dish Buffalo Chicken Mini Meatloaves 60 min 4 Stars" [ref=e797] [cursor=pointer]:
          - /url: /recipes/BuffaloChickenMiniMeatloaves/
          - generic [ref=e798]: Main Dish
          - generic [ref=e802]:
            - heading "Buffalo Chicken Mini Meatloaves" [level=6] [ref=e803]
            - generic [ref=e804]:
              - generic [ref=e805]: 60 min
              - img "4 Stars"
        - link "Easy Salmon 20 min 4 Stars" [ref=e812] [cursor=pointer]:
          - /url: /recipes/EasySalmon/
          - generic [ref=e815]:
            - heading "Easy Salmon" [level=6] [ref=e816]
            - generic [ref=e817]:
              - generic [ref=e818]: 20 min
              - img "4 Stars"
        - link "Main Dish Chickpea Tofu Curry 35 min 4 Stars" [ref=e825] [cursor=pointer]:
          - /url: /recipes/ChickpeaTofuCurry/
          - generic [ref=e826]: Main Dish
          - generic [ref=e830]:
            - heading "Chickpea Tofu Curry" [level=6] [ref=e831]
            - generic [ref=e832]:
              - generic [ref=e833]: 35 min
              - img "4 Stars"
        - link "Soup One Pot Thai Red Curry Noodle Soup 25 min 4 Stars" [ref=e840] [cursor=pointer]:
          - /url: /recipes/OnePotThaiRedCurryNoodleSoup/
          - generic [ref=e841]: Soup
          - generic [ref=e845]:
            - heading "One Pot Thai Red Curry Noodle Soup" [level=6] [ref=e846]
            - generic [ref=e847]:
              - generic [ref=e848]: 25 min
              - img "4 Stars"
        - link "Dessert Stewed Apples 2-4 hours 4 Stars" [ref=e855] [cursor=pointer]:
          - /url: /recipes/StewedApples/
          - generic [ref=e856]: Dessert
          - generic [ref=e860]:
            - heading "Stewed Apples" [level=6] [ref=e861]
            - generic [ref=e862]:
              - generic [ref=e863]: 2-4 hours
              - img "4 Stars"
        - link "Main Dish Fennel and Chickpea Ratatouille 90 min 4 Stars" [ref=e870] [cursor=pointer]:
          - /url: /recipes/ChickpeaAndFennelRatatouille/
          - generic [ref=e871]: Main Dish
          - generic [ref=e875]:
            - heading "Fennel and Chickpea Ratatouille" [level=6] [ref=e876]
            - generic [ref=e877]:
              - generic [ref=e878]: 90 min
              - img "4 Stars"
        - link "Snack Guacamole 10 min 4 Stars" [ref=e885] [cursor=pointer]:
          - /url: /recipes/Guacamole/
          - generic [ref=e886]: Snack
          - generic [ref=e890]:
            - heading "Guacamole" [level=6] [ref=e891]
            - generic [ref=e892]:
              - generic [ref=e893]: 10 min
              - img "4 Stars"
        - link "One-Pot Pasta With Tuna 30 min 4 Stars" [ref=e900] [cursor=pointer]:
          - /url: /recipes/PastaWithTuna/
          - generic [ref=e901]: One-Pot
          - generic [ref=e905]:
            - heading "Pasta With Tuna" [level=6] [ref=e906]
            - generic [ref=e907]:
              - generic [ref=e908]: 30 min
              - img "4 Stars"
        - link "Sauce Clam Sauce with Linguine 40 min 4 Stars" [ref=e915] [cursor=pointer]:
          - /url: /recipes/ClamSauceAndLinguine/
          - generic [ref=e916]: Sauce
          - generic [ref=e920]:
            - heading "Clam Sauce with Linguine" [level=6] [ref=e921]
            - generic [ref=e922]:
              - generic [ref=e923]: 40 min
              - img "4 Stars"
        - link "Apple Bread 1 hr 15 min 4 Stars" [ref=e930] [cursor=pointer]:
          - /url: /recipes/AppleBread/
          - generic [ref=e933]:
            - heading "Apple Bread" [level=6] [ref=e934]
            - generic [ref=e935]:
              - generic [ref=e936]: 1 hr 15 min
              - img "4 Stars"
        - link "Banana Bread 1 hr 15 min 4 Stars" [ref=e943] [cursor=pointer]:
          - /url: /recipes/BananaBread/
          - generic [ref=e946]:
            - heading "Banana Bread" [level=6] [ref=e947]
            - generic [ref=e948]:
              - generic [ref=e949]: 1 hr 15 min
              - img "4 Stars"
        - link "One-Pot Easy Orzo With Spinach and Feta 30 min 4 Stars" [ref=e956] [cursor=pointer]:
          - /url: /recipes/OrzoWithSpinachAndFeta/
          - generic [ref=e957]: One-Pot
          - generic [ref=e961]:
            - heading "Easy Orzo With Spinach and Feta" [level=6] [ref=e962]
            - generic [ref=e963]:
              - generic [ref=e964]: 30 min
              - img "4 Stars"
        - link "Main Dish Turkey Lasagna 130 min 4 Stars" [ref=e971] [cursor=pointer]:
          - /url: /recipes/TurkeyLasagna/
          - generic [ref=e972]: Main Dish
          - generic [ref=e976]:
            - heading "Turkey Lasagna" [level=6] [ref=e977]
            - generic [ref=e978]:
              - generic [ref=e979]: 130 min
              - img "4 Stars"
        - link "Side Dish Farro Pilaf with Balsamic Cherries 30 min 3.5 Stars" [ref=e986] [cursor=pointer]:
          - /url: /recipes/FarroPilafWithBalsamicCherries/
          - generic [ref=e987]: Side Dish
          - generic [ref=e991]:
            - heading "Farro Pilaf with Balsamic Cherries" [level=6] [ref=e992]
            - generic [ref=e993]:
              - generic [ref=e994]: 30 min
              - img "3.5 Stars"
        - link "One-Pot Mexican Skillet Lasagna 40 min 3 Stars" [ref=e1001] [cursor=pointer]:
          - /url: /recipes/MexicanSkilletLasagna/
          - generic [ref=e1002]: One-Pot
          - generic [ref=e1006]:
            - heading "Mexican Skillet Lasagna" [level=6] [ref=e1007]
            - generic [ref=e1008]:
              - generic [ref=e1009]: 40 min
              - img "3 Stars"
        - link "Salad Apple & Chicken Salad 10 min 2 Stars" [ref=e1016] [cursor=pointer]:
          - /url: /recipes/AppleAndChickenSalad/
          - generic [ref=e1017]: Salad
          - generic [ref=e1021]:
            - heading "Apple & Chicken Salad" [level=6] [ref=e1022]
            - generic [ref=e1023]:
              - generic [ref=e1024]: 10 min
              - img "2 Stars"
        - link "Main Dish Slow Cooker Tuscan Chicken 4 hours 5 min 0 Stars" [ref=e1031] [cursor=pointer]:
          - /url: /recipes/SlowCookerTuscanChicken/
          - generic [ref=e1032]: Main Dish
          - generic [ref=e1036]:
            - heading "Slow Cooker Tuscan Chicken" [level=6] [ref=e1037]
            - generic [ref=e1038]:
              - generic [ref=e1039]: 4 hours 5 min
              - img "0 Stars"
        - link "Fermentation Fermented Beans & Veggies 4 to 5 days 20 min 0 Stars" [ref=e1046] [cursor=pointer]:
          - /url: /recipes/FermentedBeansAndVeggies/
          - generic [ref=e1047]: Fermentation
          - generic [ref=e1051]:
            - heading "Fermented Beans & Veggies" [level=6] [ref=e1052]
            - generic [ref=e1053]:
              - generic [ref=e1054]: 4 to 5 days 20 min
              - img "0 Stars"
        - link "Side Dish Sourdough Stuffing 1 hr 10 min 0 Stars" [ref=e1061] [cursor=pointer]:
          - /url: /recipes/SourdoughStuffing/
          - generic [ref=e1062]: Side Dish
          - generic [ref=e1066]:
            - heading "Sourdough Stuffing" [level=6] [ref=e1067]
            - generic [ref=e1068]:
              - generic [ref=e1069]: 1 hr 10 min
              - img "0 Stars"
        - link "Thanksgiving Turkey 3 hr 50 min 0 Stars" [ref=e1076] [cursor=pointer]:
          - /url: /recipes/ThanksgivingTurkey/
          - generic [ref=e1079]:
            - heading "Thanksgiving Turkey" [level=6] [ref=e1080]
            - generic [ref=e1081]:
              - generic [ref=e1082]: 3 hr 50 min
              - img "0 Stars"
        - link "Side Dish Turkey Gravy 20 min 0 Stars" [ref=e1089] [cursor=pointer]:
          - /url: /recipes/TurkeyGravy/
          - generic [ref=e1090]: Side Dish
          - generic [ref=e1094]:
            - heading "Turkey Gravy" [level=6] [ref=e1095]
            - generic [ref=e1096]:
              - generic [ref=e1097]: 20 min
              - img "0 Stars"
  - contentinfo [ref=e1102]:
    - generic [ref=e1104]:
      - generic [ref=e1105]:
        - text: © 2026
        - link "Scott's Cookbook" [ref=e1106] [cursor=pointer]:
          - /url: /
      - generic [ref=e1107]:
        - link [ref=e1108] [cursor=pointer]:
          - /url: https://www.scotthansen.io/
        - link [ref=e1111] [cursor=pointer]:
          - /url: https://github.com/Scott123180/eatwell.link
        - link [ref=e1114] [cursor=pointer]:
          - /url: https://www.patreon.com/scotthansen
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Home page (RecipeList) tests
  5   |  *
  6   |  * Covers: page load, banner, recipe card rendering, search, topic filter,
  7   |  * sort order, empty-state, and card navigation.
  8   |  */
  9   | 
  10  | test.describe("Home page", () => {
  11  |   test.beforeEach(async ({ page }) => {
  12  |     await page.goto("/");
  13  |   });
  14  | 
  15  |   // ── Smoke ─────────────────────────────────────────────────────────────────
  16  | 
  17  |   test("loads and shows the site title", async ({ page }) => {
  18  |     await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
  19  |   });
  20  | 
  21  |   test("renders the hero heading", async ({ page }) => {
  22  |     await expect(
  23  |       page.getByRole("heading", { name: "A personal, ad-free cookbook." })
  24  |     ).toBeVisible();
  25  |   });
  26  | 
  27  |   test("renders at least one recipe card", async ({ page }) => {
  28  |     const cards = page.locator('[class*="MuiCard-root"]');
> 29  |     await expect(cards.first()).toBeVisible();
      |                                 ^ Error: expect(locator).toBeVisible() failed
  30  |     const count = await cards.count();
  31  |     expect(count).toBeGreaterThan(1);
  32  |   });
  33  | 
  34  |   // ── Card content ──────────────────────────────────────────────────────────
  35  | 
  36  |   test("recipe cards display a title", async ({ page }) => {
  37  |     const firstTitle = page
  38  |       .locator('[class*="MuiCard-root"] [class*="MuiTypography-h6"]')
  39  |       .first();
  40  |     await expect(firstTitle).not.toBeEmpty();
  41  |   });
  42  | 
  43  |   test("recipe cards display time chips", async ({ page }) => {
  44  |     // At least one card should have a total-time chip
  45  |     const timeChip = page
  46  |       .locator('[class*="MuiChip-root"]', { hasText: /min|hour/i })
  47  |       .first();
  48  |     await expect(timeChip).toBeVisible();
  49  |   });
  50  | 
  51  |   test("recipe cards show a star rating component", async ({ page }) => {
  52  |     const rating = page.locator('[class*="MuiRating-root"]').first();
  53  |     await expect(rating).toBeVisible();
  54  |   });
  55  | 
  56  |   test("cards with no image show the fallback frying-pan emoji", async ({
  57  |     page,
  58  |   }) => {
  59  |     const fallback = page
  60  |       .locator('[role="img"][aria-label="frying pan"]')
  61  |       .first();
  62  |     // Only assert if at least one exists — not all cards may be imageless
  63  |     const count = await fallback.count();
  64  |     if (count > 0) {
  65  |       await expect(fallback).toBeVisible();
  66  |     }
  67  |   });
  68  | 
  69  |   // ── Search ────────────────────────────────────────────────────────────────
  70  | 
  71  |   test("search box is visible and accepts input", async ({ page }) => {
  72  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  73  |     await expect(search).toBeVisible();
  74  |     await search.fill("lentil");
  75  |     await expect(search).toHaveValue("lentil");
  76  |   });
  77  | 
  78  |   test("search filters recipes by title (case-insensitive)", async ({
  79  |     page,
  80  |   }) => {
  81  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  82  |     await search.fill("Mjadra");
  83  | 
  84  |     const cards = page.locator('[class*="MuiCard-root"]');
  85  |     const count = await cards.count();
  86  |     for (let i = 0; i < count; i++) {
  87  |       const text = await cards.nth(i).innerText();
  88  |       expect(text.toLowerCase()).toContain("mjadra");
  89  |     }
  90  |   });
  91  | 
  92  |   test("search matches recipes by ingredient name even when the ingredient isn't in the title", async ({
  93  |     page,
  94  |   }) => {
  95  |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  96  |     await search.fill("lentil");
  97  | 
  98  |     const cards = page.locator('[class*="MuiCard-root"]');
  99  |     await expect(cards.first()).toBeVisible();
  100 |     const titles = await page.locator('[class*="MuiCard-root"] h6').allInnerTexts();
  101 |     expect(titles.some((t) => !t.toLowerCase().includes("lentil"))).toBe(true);
  102 |   });
  103 | 
  104 |   test("search by topic keyword shows matching cards", async ({ page }) => {
  105 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  106 |     await search.fill("Soup");
  107 | 
  108 |     const cards = page.locator('[class*="MuiCard-root"]');
  109 |     await expect(cards.first()).toBeVisible();
  110 |   });
  111 | 
  112 |   test("empty state message appears when search has no matches", async ({
  113 |     page,
  114 |   }) => {
  115 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  116 |     await search.fill("xyzzy_no_recipe_matches_this");
  117 | 
  118 |     await expect(page.getByText("No recipes found")).toBeVisible();
  119 |     await expect(
  120 |       page.getByText("Try clearing filters or searching a different term.")
  121 |     ).toBeVisible();
  122 |   });
  123 | 
  124 |   test("clearing the search restores the full recipe list", async ({
  125 |     page,
  126 |   }) => {
  127 |     const search = page.getByPlaceholder("Search title, ingredient, or step…");
  128 |     // Wait for the initial card render before counting, so a slow first
  129 |     // paint (seen on Firefox) doesn't get read as "zero cards".
```