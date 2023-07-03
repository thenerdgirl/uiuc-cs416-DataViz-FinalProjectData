#!/usr/bin/python
import csv

# set up column values
Fruit = 0
Form = 1
RetailPrice = 2

# Set up seasons
spring = ["Apples","Apricots","Bananas","Kiwi","Nectarines","Pineapple","Strawberries"]
summer = ["Apples","Apricots","Bananas","Blackberries","Blueberries","Cantaloupe","Cherries","Honeydew","Mangoes","Nectarines","Papaya","Peaches","Plum","Raspberries","Strawberries","Watermelon"]
fall = ["Apples","Bananas","Clementines","Grapes","Kiwi","Mangoes","Papaya","Pears","Pineapple","Pomegranate","Raspberries"]
winter = ["Apples","Bananas","Clementines","Grapefruit","Kiwi","Oranges","Pears","Pineapple"]

spring_price = 0
summer_price = 0
fall_price = 0
winter_price = 0

spring_count = 0
summer_count = 0
fall_count = 0
winter_count = 0

# Set up scatterplot
fresh_fruit = {} # fruit : retail price
canned_fruit = {}
juice_fruit = {}
dried_fruit = {}
frozen_fruit = {}
# fresh canned juice dried frozen

with open('FruitPrices2020.csv', newline='') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        # Get data for bar chart
        if line_count != 0 and row[Form] == "Fresh":
            if row[Fruit] in spring:
                spring_price += float(row[RetailPrice])
                spring_count += 1
            if row[Fruit] in summer:
                summer_price += float(row[RetailPrice])
                summer_count += 1
            if row[Fruit] in fall:
                fall_price += float(row[RetailPrice])
                fall_count += 1
            if row[Fruit] in winter:
                winter_price += float(row[RetailPrice])
                winter_count += 1

        # Get data for the scatterplots
        if line_count != 0:
            if row[Form] == "Fresh":
                fresh_fruit[row[Fruit]] = row[RetailPrice]
            if row[Form] ==  "Canned":
                canned_fruit[row[Fruit]] = row[RetailPrice]
            if row[Form] ==  "Juice":
                juice_fruit[row[Fruit]] = row[RetailPrice]
            if row[Form] ==  "Dried":
                dried_fruit[row[Fruit]] = row[RetailPrice]
            if row[Form] ==  "Frozen":
                frozen_fruit[row[Fruit]] = row[RetailPrice]

        line_count += 1
    print(f'Procesed {line_count} lines')

    # After reading the file, do the calculation
    spring_avg = round(spring_price / spring_count, 2)
    summer_avg = round(summer_price / summer_count, 2)
    winter_avg = round(winter_price / winter_count, 2)
    fall_avg = round(fall_price / fall_count, 2)

    with open('FruitPricesPerSeason.csv', mode='wt') as f:
        f.write("Season,AvgPrice\n")
        f.write("Spring,"+ str(spring_avg) +"\n")
        f.write("Summer,"+ str(summer_avg) +"\n")
        f.write("Fall,"+ str(fall_avg) +"\n")
        f.write("Winter,"+ str(winter_avg) +"\n")
    
    with open('CannedFruitPrices.csv', mode='wt') as f:
        f.write("Fruit,RetailPrice\n")
        for ff in canned_fruit:
            f.write(ff+","+canned_fruit[ff]+"\n")
    
    with open('JuiceFruitPrices.csv', mode='wt') as f:
        f.write("Fruit,RetailPrice\n")
        for ff in juice_fruit:
            f.write(ff+","+juice_fruit[ff]+"\n")

    with open('DriedFruitPrices.csv', mode='wt') as f:
        f.write("Fruit,RetailPrice\n")
        for ff in dried_fruit:
            f.write(ff+","+dried_fruit[ff]+"\n")

    with open('FrozenFruitPrices.csv', mode='wt') as f:
        f.write("Fruit,RetailPrice\n")
        for ff in frozen_fruit:
            f.write(ff+","+frozen_fruit[ff]+"\n")
