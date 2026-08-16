# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home page >> loads and shows the site title
- Location: e2e/home.spec.ts:17:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Scott'?s Cookbook/i
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    3 × locator resolved to <html>…</html>
      - unexpected value ""

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
          - generic [ref=e54]:
            - heading "Instant Pot Brown Rice" [level=6] [ref=e55]
            - generic [ref=e56]:
              - generic [ref=e57]: 21 min
              - img "5 Stars"
        - link "Salad Four Bean Salad 15 min + overnight chilling 5 Stars" [ref=e64] [cursor=pointer]:
          - /url: /recipes/FourBeanSalad/
          - generic [ref=e65]: Salad
          - generic [ref=e71]:
            - heading "Four Bean Salad" [level=6] [ref=e72]
            - generic [ref=e73]:
              - generic [ref=e74]: 15 min + overnight chilling
              - img "5 Stars"
        - link "Salad Mediterranean Bean Salad 20 min 5 Stars" [ref=e81] [cursor=pointer]:
          - /url: /recipes/MediterraneanBeanSalad/
          - generic [ref=e82]: Salad
          - generic [ref=e88]:
            - heading "Mediterranean Bean Salad" [level=6] [ref=e89]
            - generic [ref=e90]:
              - generic [ref=e91]: 20 min
              - img "5 Stars"
        - link "Salad Three Bean Salad 20 min + overnight chilling 5 Stars" [ref=e98] [cursor=pointer]:
          - /url: /recipes/ThreeBeanSalad/
          - generic [ref=e99]: Salad
          - generic [ref=e105]:
            - heading "Three Bean Salad" [level=6] [ref=e106]
            - generic [ref=e107]:
              - generic [ref=e108]: 20 min + overnight chilling
              - img "5 Stars"
        - link "Side Dish Lemon-Garlic Lima Beans 1 hr 30 min + soaking time 5 Stars" [ref=e115] [cursor=pointer]:
          - /url: /recipes/LemonGarlicLimaBeans/
          - generic [ref=e116]: Side Dish
          - generic [ref=e122]:
            - heading "Lemon-Garlic Lima Beans" [level=6] [ref=e123]
            - generic [ref=e124]:
              - generic [ref=e125]: 1 hr 30 min + soaking time
              - img "5 Stars"
        - link "Spicy Thai Noodles 15 min 5 Stars" [ref=e132] [cursor=pointer]:
          - /url: /recipes/SpicyThaiNoodles/
          - generic [ref=e137]:
            - heading "Spicy Thai Noodles" [level=6] [ref=e138]
            - generic [ref=e139]:
              - generic [ref=e140]: 15 min
              - img "5 Stars"
        - link "Main Dish Lentil Loaf 80 min 5 Stars" [ref=e147] [cursor=pointer]:
          - /url: /recipes/LentilLoaf/
          - generic [ref=e148]: Main Dish
          - generic [ref=e154]:
            - heading "Lentil Loaf" [level=6] [ref=e155]
            - generic [ref=e156]:
              - generic [ref=e157]: 80 min
              - img "5 Stars"
        - link "Sauce Easy Beef Gravy 20 min 5 Stars" [ref=e164] [cursor=pointer]:
          - /url: /recipes/EasyBeefGravy/
          - generic [ref=e165]: Sauce
          - generic [ref=e171]:
            - heading "Easy Beef Gravy" [level=6] [ref=e172]
            - generic [ref=e173]:
              - generic [ref=e174]: 20 min
              - img "5 Stars"
        - link "Fermentation Fermented Dilly Beans 7 days 15 min 5 Stars" [ref=e181] [cursor=pointer]:
          - /url: /recipes/FermentedDillyBeans/
          - generic [ref=e182]: Fermentation
          - generic [ref=e188]:
            - heading "Fermented Dilly Beans" [level=6] [ref=e189]
            - generic [ref=e190]:
              - generic [ref=e191]: 7 days 15 min
              - img "5 Stars"
        - link "Hard Cooked (Steamed) Eggs 33 min 5 Stars" [ref=e198] [cursor=pointer]:
          - /url: /recipes/HardCookedEggs/
          - generic [ref=e203]:
            - heading "Hard Cooked (Steamed) Eggs" [level=6] [ref=e204]
            - generic [ref=e205]:
              - generic [ref=e206]: 33 min
              - img "5 Stars"
        - link "Masoor Dal (Spiced Red Lentils) 45 min 5 Stars" [ref=e213] [cursor=pointer]:
          - /url: /recipes/MasoorDal/
          - generic [ref=e218]:
            - heading "Masoor Dal (Spiced Red Lentils)" [level=6] [ref=e219]
            - generic [ref=e220]:
              - generic [ref=e221]: 45 min
              - img "5 Stars"
        - link "Snack Pickled Eggs 3 days 15 min 5 Stars" [ref=e228] [cursor=pointer]:
          - /url: /recipes/PickledEggs/
          - generic [ref=e229]: Snack
          - generic [ref=e235]:
            - heading "Pickled Eggs" [level=6] [ref=e236]
            - generic [ref=e237]:
              - generic [ref=e238]: 3 days 15 min
              - img "5 Stars"
        - link "Soup White Bean, Rice, and Dill Soup 45 min 5 Stars" [ref=e245] [cursor=pointer]:
          - /url: /recipes/WhiteBeanRiceAndDillSoup/
          - generic [ref=e246]: Soup
          - generic [ref=e252]:
            - heading "White Bean, Rice, and Dill Soup" [level=6] [ref=e253]
            - generic [ref=e254]:
              - generic [ref=e255]: 45 min
              - img "5 Stars"
        - link "Soup Carrot Ginger Soup (Served Hot or Cold) 40 minutes 5 Stars" [ref=e262] [cursor=pointer]:
          - /url: /recipes/CarrotGingerSoup/
          - generic [ref=e263]: Soup
          - generic [ref=e269]:
            - heading "Carrot Ginger Soup (Served Hot or Cold)" [level=6] [ref=e270]
            - generic [ref=e271]:
              - generic [ref=e272]: 40 minutes
              - img "5 Stars"
        - link "Fermentation Fermented Beans 4 to 5 days 20 min 5 Stars" [ref=e279] [cursor=pointer]:
          - /url: /recipes/FermentedBeans/
          - generic [ref=e280]: Fermentation
          - generic [ref=e286]:
            - heading "Fermented Beans" [level=6] [ref=e287]
            - generic [ref=e288]:
              - generic [ref=e289]: 4 to 5 days 20 min
              - img "5 Stars"
        - link "Fermentation Fermented Carrots 5–10 days 15 min 5 Stars" [ref=e296] [cursor=pointer]:
          - /url: /recipes/FermentedCarrots/
          - generic [ref=e297]: Fermentation
          - generic [ref=e303]:
            - heading "Fermented Carrots" [level=6] [ref=e304]
            - generic [ref=e305]:
              - generic [ref=e306]: 5–10 days 15 min
              - img "5 Stars"
        - link "Fermentation Traditional Sauerkraut 14 days 5 Stars" [ref=e313] [cursor=pointer]:
          - /url: /recipes/Sauerkraut/
          - generic [ref=e314]: Fermentation
          - generic [ref=e320]:
            - heading "Traditional Sauerkraut" [level=6] [ref=e321]
            - generic [ref=e322]:
              - generic [ref=e323]: 14 days
              - img "5 Stars"
        - link "Salad Three Ingredient Mediterranean Salad 15 min 5 Stars" [ref=e330] [cursor=pointer]:
          - /url: /recipes/ThreeIngrediantMediterraneanSalad/
          - generic [ref=e331]: Salad
          - generic [ref=e337]:
            - heading "Three Ingredient Mediterranean Salad" [level=6] [ref=e338]
            - generic [ref=e339]:
              - generic [ref=e340]: 15 min
              - img "5 Stars"
        - link "Main Dish Instant Pot Pork Loin 50 min 5 Stars" [ref=e347] [cursor=pointer]:
          - /url: /recipes/InstantPotPorkLoin/
          - generic [ref=e348]: Main Dish
          - generic [ref=e354]:
            - heading "Instant Pot Pork Loin" [level=6] [ref=e355]
            - generic [ref=e356]:
              - generic [ref=e357]: 50 min
              - img "5 Stars"
        - link "Chicken Enchiladas 75 min 5 Stars" [ref=e364] [cursor=pointer]:
          - /url: /recipes/ChickenEnchiladas/
          - generic [ref=e369]:
            - heading "Chicken Enchiladas" [level=6] [ref=e370]
            - generic [ref=e371]:
              - generic [ref=e372]: 75 min
              - img "5 Stars"
        - link "Snack Cowboy Caviar 15 min 5 Stars" [ref=e379] [cursor=pointer]:
          - /url: /recipes/CowboyCaviar/
          - generic [ref=e380]: Snack
          - generic [ref=e386]:
            - heading "Cowboy Caviar" [level=6] [ref=e387]
            - generic [ref=e388]:
              - generic [ref=e389]: 15 min
              - img "5 Stars"
        - link "Salad Black Bean Salad 20 min 5 Stars" [ref=e396] [cursor=pointer]:
          - /url: /recipes/BlackBeanSalad/
          - generic [ref=e397]: Salad
          - generic [ref=e403]:
            - heading "Black Bean Salad" [level=6] [ref=e404]
            - generic [ref=e405]:
              - generic [ref=e406]: 20 min
              - img "5 Stars"
        - link "Fermentation Easy Homemade Kimchi 4–7 days 5 Stars" [ref=e413] [cursor=pointer]:
          - /url: /recipes/EasyHomemadeKimchi/
          - generic [ref=e414]: Fermentation
          - generic [ref=e420]:
            - heading "Easy Homemade Kimchi" [level=6] [ref=e421]
            - generic [ref=e422]:
              - generic [ref=e423]: 4–7 days
              - img "5 Stars"
        - link "Soup Restaurant-Style Miso Ramen 80 min 5 Stars" [ref=e430] [cursor=pointer]:
          - /url: /recipes/ChickenMisoRamen/
          - generic [ref=e431]: Soup
          - generic [ref=e437]:
            - heading "Restaurant-Style Miso Ramen" [level=6] [ref=e438]
            - generic [ref=e439]:
              - generic [ref=e440]: 80 min
              - img "5 Stars"
        - link "Soup Split Pea Soup without Pork 2 hrs 15 min 5 Stars" [ref=e447] [cursor=pointer]:
          - /url: /recipes/SplitPeaSoupWithoutPork/
          - generic [ref=e448]: Soup
          - generic [ref=e454]:
            - heading "Split Pea Soup without Pork" [level=6] [ref=e455]
            - generic [ref=e456]:
              - generic [ref=e457]: 2 hrs 15 min
              - img "5 Stars"
        - link "Spanish Pinto Bean Stew | Potaje de Alubias Pintas 45 min 5 Stars" [ref=e464] [cursor=pointer]:
          - /url: /recipes/SpanishPintoBeanStew/
          - generic [ref=e469]:
            - heading "Spanish Pinto Bean Stew | Potaje de Alubias Pintas" [level=6] [ref=e470]
            - generic [ref=e471]:
              - generic [ref=e472]: 45 min
              - img "5 Stars"
        - link "Salad Asian Edamame Bean Salad 70 min 5 Stars" [ref=e479] [cursor=pointer]:
          - /url: /recipes/AsianEdamameBeanSalad/
          - generic [ref=e480]: Salad
          - generic [ref=e486]:
            - heading "Asian Edamame Bean Salad" [level=6] [ref=e487]
            - generic [ref=e488]:
              - generic [ref=e489]: 70 min
              - img "5 Stars"
        - link "Tofu Tacos 45 min 5 Stars" [ref=e496] [cursor=pointer]:
          - /url: /recipes/TofuTacos/
          - generic [ref=e501]:
            - heading "Tofu Tacos" [level=6] [ref=e502]
            - generic [ref=e503]:
              - generic [ref=e504]: 45 min
              - img "5 Stars"
        - link "Whole Wheat Pancakes 30 min 5 Stars" [ref=e511] [cursor=pointer]:
          - /url: /recipes/WholeWheatPancakes/
          - generic [ref=e516]:
            - heading "Whole Wheat Pancakes" [level=6] [ref=e517]
            - generic [ref=e518]:
              - generic [ref=e519]: 30 min
              - img "5 Stars"
        - link "Vegan Cheesy Pasta Sauce (Cashew Alfredo) 25 min 5 Stars" [ref=e526] [cursor=pointer]:
          - /url: /recipes/VeganCheesyPastaSauceCashewAlfredo/
          - generic [ref=e531]:
            - heading "Vegan Cheesy Pasta Sauce (Cashew Alfredo)" [level=6] [ref=e532]
            - generic [ref=e533]:
              - generic [ref=e534]: 25 min
              - img "5 Stars"
        - link "Main Dish Baked Chicken with Pesto 30 min 5 Stars" [ref=e541] [cursor=pointer]:
          - /url: /recipes/BakedChickenPesto/
          - generic [ref=e542]: Main Dish
          - generic [ref=e548]:
            - heading "Baked Chicken with Pesto" [level=6] [ref=e549]
            - generic [ref=e550]:
              - generic [ref=e551]: 30 min
              - img "5 Stars"
        - link "Sauce Walnut Pesto 10 min 5 Stars" [ref=e558] [cursor=pointer]:
          - /url: /recipes/WalnutPesto/
          - generic [ref=e559]: Sauce
          - generic [ref=e565]:
            - heading "Walnut Pesto" [level=6] [ref=e566]
            - generic [ref=e567]:
              - generic [ref=e568]: 10 min
              - img "5 Stars"
        - link "Greek Pasta Salad 25 min 5 Stars" [ref=e575] [cursor=pointer]:
          - /url: /recipes/GreekPastaSalad/
          - generic [ref=e580]:
            - heading "Greek Pasta Salad" [level=6] [ref=e581]
            - generic [ref=e582]:
              - generic [ref=e583]: 25 min
              - img "5 Stars"
        - link "Side Dish Instant Pot Quinoa 25 min 5 Stars" [ref=e590] [cursor=pointer]:
          - /url: /recipes/InstantPotQuinoa/
          - generic [ref=e591]: Side Dish
          - generic [ref=e597]:
            - heading "Instant Pot Quinoa" [level=6] [ref=e598]
            - generic [ref=e599]:
              - generic [ref=e600]: 25 min
              - img "5 Stars"
        - link "Salad Simple White Bean Salad 30 min 5 Stars" [ref=e607] [cursor=pointer]:
          - /url: /recipes/SimpleWhiteBeanSalad/
          - generic [ref=e608]: Salad
          - generic [ref=e614]:
            - heading "Simple White Bean Salad" [level=6] [ref=e615]
            - generic [ref=e616]:
              - generic [ref=e617]: 30 min
              - img "5 Stars"
        - link "Vegetable Broth 1 hr 10 min 5 Stars" [ref=e624] [cursor=pointer]:
          - /url: /recipes/VeggieBroth/
          - generic [ref=e629]:
            - heading "Vegetable Broth" [level=6] [ref=e630]
            - generic [ref=e631]:
              - generic [ref=e632]: 1 hr 10 min
              - img "5 Stars"
        - link "Apple Butter 8 hours 20 minutes 5 Stars" [ref=e639] [cursor=pointer]:
          - /url: /recipes/AppleButter/
          - generic [ref=e644]:
            - heading "Apple Butter" [level=6] [ref=e645]
            - generic [ref=e646]:
              - generic [ref=e647]: 8 hours 20 minutes
              - img "5 Stars"
        - link "Lentil Soup 60 min 5 Stars" [ref=e654] [cursor=pointer]:
          - /url: /recipes/LentilSoup/
          - generic [ref=e659]:
            - heading "Lentil Soup" [level=6] [ref=e660]
            - generic [ref=e661]:
              - generic [ref=e662]: 60 min
              - img "5 Stars"
        - link "Mjadra (Lentils and Rice) 9 hours 20 min 5 Stars" [ref=e669] [cursor=pointer]:
          - /url: /recipes/Mjadra/
          - generic [ref=e674]:
            - heading "Mjadra (Lentils and Rice)" [level=6] [ref=e675]
            - generic [ref=e676]:
              - generic [ref=e677]: 9 hours 20 min
              - img "5 Stars"
        - link "Back Pocket Stir Fry 40 min 5 Stars" [ref=e684] [cursor=pointer]:
          - /url: /recipes/BackPocketStirFry/
          - generic [ref=e689]:
            - heading "Back Pocket Stir Fry" [level=6] [ref=e690]
            - generic [ref=e691]:
              - generic [ref=e692]: 40 min
              - img "5 Stars"
        - link "Main Dish Slow Cooker Chili 4 hours 15 min - 6 hours 15 min 5 Stars" [ref=e699] [cursor=pointer]:
          - /url: /recipes/SlowCookerChile/
          - generic [ref=e700]: Main Dish
          - generic [ref=e706]:
            - heading "Slow Cooker Chili" [level=6] [ref=e707]
            - generic [ref=e708]:
              - generic [ref=e709]: 4 hours 15 min - 6 hours 15 min
              - img "5 Stars"
        - link "Side Dish Braised Lentils 55 min 5 Stars" [ref=e716] [cursor=pointer]:
          - /url: /recipes/BraisedLentils/
          - generic [ref=e717]: Side Dish
          - generic [ref=e723]:
            - heading "Braised Lentils" [level=6] [ref=e724]
            - generic [ref=e725]:
              - generic [ref=e726]: 55 min
              - img "5 Stars"
        - link "Main Dish Vegan Mushroom Stew 45 min 4.5 Stars" [ref=e733] [cursor=pointer]:
          - /url: /recipes/VeganMushroomStew/
          - generic [ref=e734]: Main Dish
          - generic [ref=e740]:
            - heading "Vegan Mushroom Stew" [level=6] [ref=e741]
            - generic [ref=e742]:
              - generic [ref=e743]: 45 min
              - img "4.5 Stars"
        - link "Salad Classic Chicken Salad 15 min 4.5 Stars" [ref=e750] [cursor=pointer]:
          - /url: /recipes/ClassicChickenSalad/
          - generic [ref=e751]: Salad
          - generic [ref=e757]:
            - heading "Classic Chicken Salad" [level=6] [ref=e758]
            - generic [ref=e759]:
              - generic [ref=e760]: 15 min
              - img "4.5 Stars"
        - link "Instant Pot Spinach Artichoke Chicken 1 hr 4.5 Stars" [ref=e767] [cursor=pointer]:
          - /url: /recipes/InstantPotSpinachArtichokeChicken/
          - generic [ref=e772]:
            - heading "Instant Pot Spinach Artichoke Chicken" [level=6] [ref=e773]
            - generic [ref=e774]:
              - generic [ref=e775]: 1 hr
              - img "4.5 Stars"
        - link "Salad Vegetable Quinoa Salad 50 min 4.5 Stars" [ref=e782] [cursor=pointer]:
          - /url: /recipes/VegetableQuinoaSalad/
          - generic [ref=e783]: Salad
          - generic [ref=e789]:
            - heading "Vegetable Quinoa Salad" [level=6] [ref=e790]
            - generic [ref=e791]:
              - generic [ref=e792]: 50 min
              - img "4.5 Stars"
        - link "Side Dish Lemon Basil Pasta Salad 2 hrs 17 min 4.5 Stars" [ref=e799] [cursor=pointer]:
          - /url: /recipes/LemonBasilPastaSalad/
          - generic [ref=e800]: Side Dish
          - generic [ref=e806]:
            - heading "Lemon Basil Pasta Salad" [level=6] [ref=e807]
            - generic [ref=e808]:
              - generic [ref=e809]: 2 hrs 17 min
              - img "4.5 Stars"
        - link "Salad Pinto Bean Salad 50 min 4.5 Stars" [ref=e816] [cursor=pointer]:
          - /url: /recipes/PintoBeanSalad/
          - generic [ref=e817]: Salad
          - generic [ref=e823]:
            - heading "Pinto Bean Salad" [level=6] [ref=e824]
            - generic [ref=e825]:
              - generic [ref=e826]: 50 min
              - img "4.5 Stars"
        - link "Salad Mediterranean Lentil Salad 35 min 4.5 Stars" [ref=e833] [cursor=pointer]:
          - /url: /recipes/MediterraneanLentilSalad/
          - generic [ref=e834]: Salad
          - generic [ref=e840]:
            - heading "Mediterranean Lentil Salad" [level=6] [ref=e841]
            - generic [ref=e842]:
              - generic [ref=e843]: 35 min
              - img "4.5 Stars"
        - link "Salad Roasted Beet and Egg Salad with Rye Croutons 55 min 4 Stars" [ref=e850] [cursor=pointer]:
          - /url: /recipes/RoastedBeetAndEggSaladWithRyeCroutons/
          - generic [ref=e851]: Salad
          - generic [ref=e857]:
            - heading "Roasted Beet and Egg Salad with Rye Croutons" [level=6] [ref=e858]
            - generic [ref=e859]:
              - generic [ref=e860]: 55 min
              - img "4 Stars"
        - link "Soup Spicy Black Bean Soup 60 min 4 Stars" [ref=e867] [cursor=pointer]:
          - /url: /recipes/SpicyBlackBeanSoup/
          - generic [ref=e868]: Soup
          - generic [ref=e874]:
            - heading "Spicy Black Bean Soup" [level=6] [ref=e875]
            - generic [ref=e876]:
              - generic [ref=e877]: 60 min
              - img "4 Stars"
        - link "Soup Pasta And Kidney Bean Soup 60 min 4 Stars" [ref=e884] [cursor=pointer]:
          - /url: /recipes/PastaAndWhiteBeanSoup/
          - generic [ref=e885]: Soup
          - generic [ref=e891]:
            - heading "Pasta And Kidney Bean Soup" [level=6] [ref=e892]
            - generic [ref=e893]:
              - generic [ref=e894]: 60 min
              - img "4 Stars"
        - link "Main Dish Buffalo Chicken Mini Meatloaves 60 min 4 Stars" [ref=e901] [cursor=pointer]:
          - /url: /recipes/BuffaloChickenMiniMeatloaves/
          - generic [ref=e902]: Main Dish
          - generic [ref=e908]:
            - heading "Buffalo Chicken Mini Meatloaves" [level=6] [ref=e909]
            - generic [ref=e910]:
              - generic [ref=e911]: 60 min
              - img "4 Stars"
        - link "Easy Salmon 20 min 4 Stars" [ref=e918] [cursor=pointer]:
          - /url: /recipes/EasySalmon/
          - generic [ref=e923]:
            - heading "Easy Salmon" [level=6] [ref=e924]
            - generic [ref=e925]:
              - generic [ref=e926]: 20 min
              - img "4 Stars"
        - link "Main Dish Chickpea Tofu Curry 35 min 4 Stars" [ref=e933] [cursor=pointer]:
          - /url: /recipes/ChickpeaTofuCurry/
          - generic [ref=e934]: Main Dish
          - generic [ref=e940]:
            - heading "Chickpea Tofu Curry" [level=6] [ref=e941]
            - generic [ref=e942]:
              - generic [ref=e943]: 35 min
              - img "4 Stars"
        - link "Soup One Pot Thai Red Curry Noodle Soup 25 min 4 Stars" [ref=e950] [cursor=pointer]:
          - /url: /recipes/OnePotThaiRedCurryNoodleSoup/
          - generic [ref=e951]: Soup
          - generic [ref=e957]:
            - heading "One Pot Thai Red Curry Noodle Soup" [level=6] [ref=e958]
            - generic [ref=e959]:
              - generic [ref=e960]: 25 min
              - img "4 Stars"
        - link "Dessert Stewed Apples 2-4 hours 4 Stars" [ref=e967] [cursor=pointer]:
          - /url: /recipes/StewedApples/
          - generic [ref=e968]: Dessert
          - generic [ref=e974]:
            - heading "Stewed Apples" [level=6] [ref=e975]
            - generic [ref=e976]:
              - generic [ref=e977]: 2-4 hours
              - img "4 Stars"
        - link "Main Dish Fennel and Chickpea Ratatouille 90 min 4 Stars" [ref=e984] [cursor=pointer]:
          - /url: /recipes/ChickpeaAndFennelRatatouille/
          - generic [ref=e985]: Main Dish
          - generic [ref=e991]:
            - heading "Fennel and Chickpea Ratatouille" [level=6] [ref=e992]
            - generic [ref=e993]:
              - generic [ref=e994]: 90 min
              - img "4 Stars"
        - link "Snack Guacamole 10 min 4 Stars" [ref=e1001] [cursor=pointer]:
          - /url: /recipes/Guacamole/
          - generic [ref=e1002]: Snack
          - generic [ref=e1008]:
            - heading "Guacamole" [level=6] [ref=e1009]
            - generic [ref=e1010]:
              - generic [ref=e1011]: 10 min
              - img "4 Stars"
        - link "One-Pot Pasta With Tuna 30 min 4 Stars" [ref=e1018] [cursor=pointer]:
          - /url: /recipes/PastaWithTuna/
          - generic [ref=e1019]: One-Pot
          - generic [ref=e1025]:
            - heading "Pasta With Tuna" [level=6] [ref=e1026]
            - generic [ref=e1027]:
              - generic [ref=e1028]: 30 min
              - img "4 Stars"
        - link "Sauce Clam Sauce with Linguine 40 min 4 Stars" [ref=e1035] [cursor=pointer]:
          - /url: /recipes/ClamSauceAndLinguine/
          - generic [ref=e1036]: Sauce
          - generic [ref=e1042]:
            - heading "Clam Sauce with Linguine" [level=6] [ref=e1043]
            - generic [ref=e1044]:
              - generic [ref=e1045]: 40 min
              - img "4 Stars"
        - link "Apple Bread 1 hr 15 min 4 Stars" [ref=e1052] [cursor=pointer]:
          - /url: /recipes/AppleBread/
          - generic [ref=e1057]:
            - heading "Apple Bread" [level=6] [ref=e1058]
            - generic [ref=e1059]:
              - generic [ref=e1060]: 1 hr 15 min
              - img "4 Stars"
        - link "Banana Bread 1 hr 15 min 4 Stars" [ref=e1067] [cursor=pointer]:
          - /url: /recipes/BananaBread/
          - generic [ref=e1072]:
            - heading "Banana Bread" [level=6] [ref=e1073]
            - generic [ref=e1074]:
              - generic [ref=e1075]: 1 hr 15 min
              - img "4 Stars"
        - link "One-Pot Easy Orzo With Spinach and Feta 30 min 4 Stars" [ref=e1082] [cursor=pointer]:
          - /url: /recipes/OrzoWithSpinachAndFeta/
          - generic [ref=e1083]: One-Pot
          - generic [ref=e1089]:
            - heading "Easy Orzo With Spinach and Feta" [level=6] [ref=e1090]
            - generic [ref=e1091]:
              - generic [ref=e1092]: 30 min
              - img "4 Stars"
        - link "Main Dish Turkey Lasagna 130 min 4 Stars" [ref=e1099] [cursor=pointer]:
          - /url: /recipes/TurkeyLasagna/
          - generic [ref=e1100]: Main Dish
          - generic [ref=e1106]:
            - heading "Turkey Lasagna" [level=6] [ref=e1107]
            - generic [ref=e1108]:
              - generic [ref=e1109]: 130 min
              - img "4 Stars"
        - link "Side Dish Farro Pilaf with Balsamic Cherries 30 min 3.5 Stars" [ref=e1116] [cursor=pointer]:
          - /url: /recipes/FarroPilafWithBalsamicCherries/
          - generic [ref=e1117]: Side Dish
          - generic [ref=e1123]:
            - heading "Farro Pilaf with Balsamic Cherries" [level=6] [ref=e1124]
            - generic [ref=e1125]:
              - generic [ref=e1126]: 30 min
              - img "3.5 Stars"
        - link "One-Pot Mexican Skillet Lasagna 40 min 3 Stars" [ref=e1133] [cursor=pointer]:
          - /url: /recipes/MexicanSkilletLasagna/
          - generic [ref=e1134]: One-Pot
          - generic [ref=e1140]:
            - heading "Mexican Skillet Lasagna" [level=6] [ref=e1141]
            - generic [ref=e1142]:
              - generic [ref=e1143]: 40 min
              - img "3 Stars"
        - link "Salad Apple & Chicken Salad 10 min 2 Stars" [ref=e1150] [cursor=pointer]:
          - /url: /recipes/AppleAndChickenSalad/
          - generic [ref=e1151]: Salad
          - generic [ref=e1157]:
            - heading "Apple & Chicken Salad" [level=6] [ref=e1158]
            - generic [ref=e1159]:
              - generic [ref=e1160]: 10 min
              - img "2 Stars"
        - link "Main Dish Slow Cooker Tuscan Chicken 4 hours 5 min 0 Stars" [ref=e1167] [cursor=pointer]:
          - /url: /recipes/SlowCookerTuscanChicken/
          - generic [ref=e1168]: Main Dish
          - generic [ref=e1174]:
            - heading "Slow Cooker Tuscan Chicken" [level=6] [ref=e1175]
            - generic [ref=e1176]:
              - generic [ref=e1177]: 4 hours 5 min
              - img "0 Stars"
        - link "Fermentation Fermented Beans & Veggies 4 to 5 days 20 min 0 Stars" [ref=e1184] [cursor=pointer]:
          - /url: /recipes/FermentedBeansAndVeggies/
          - generic [ref=e1185]: Fermentation
          - generic [ref=e1191]:
            - heading "Fermented Beans & Veggies" [level=6] [ref=e1192]
            - generic [ref=e1193]:
              - generic [ref=e1194]: 4 to 5 days 20 min
              - img "0 Stars"
        - link "Side Dish Sourdough Stuffing 1 hr 10 min 0 Stars" [ref=e1201] [cursor=pointer]:
          - /url: /recipes/SourdoughStuffing/
          - generic [ref=e1202]: Side Dish
          - generic [ref=e1208]:
            - heading "Sourdough Stuffing" [level=6] [ref=e1209]
            - generic [ref=e1210]:
              - generic [ref=e1211]: 1 hr 10 min
              - img "0 Stars"
        - link "Thanksgiving Turkey 3 hr 50 min 0 Stars" [ref=e1218] [cursor=pointer]:
          - /url: /recipes/ThanksgivingTurkey/
          - generic [ref=e1223]:
            - heading "Thanksgiving Turkey" [level=6] [ref=e1224]
            - generic [ref=e1225]:
              - generic [ref=e1226]: 3 hr 50 min
              - img "0 Stars"
        - link "Side Dish Turkey Gravy 20 min 0 Stars" [ref=e1233] [cursor=pointer]:
          - /url: /recipes/TurkeyGravy/
          - generic [ref=e1234]: Side Dish
          - generic [ref=e1240]:
            - heading "Turkey Gravy" [level=6] [ref=e1241]
            - generic [ref=e1242]:
              - generic [ref=e1243]: 20 min
              - img "0 Stars"
  - contentinfo [ref=e1248]:
    - generic [ref=e1250]:
      - generic [ref=e1251]:
        - text: © 2026
        - link "Scott's Cookbook" [ref=e1252] [cursor=pointer]:
          - /url: /
      - generic [ref=e1253]:
        - link [ref=e1254] [cursor=pointer]:
          - /url: https://www.scotthansen.io/
        - link [ref=e1257] [cursor=pointer]:
          - /url: https://github.com/Scott123180/eatwell.link
        - link [ref=e1260] [cursor=pointer]:
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
> 18  |     await expect(page).toHaveTitle(/Scott'?s Cookbook/i);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
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
  29  |     await expect(cards.first()).toBeVisible();
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
```