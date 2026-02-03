import pandas as pd
import numpy as np
import pickle
from xgboost import XGBRFRegressor
from sklearn.model_selection import train_test_split

# Load training data
df = pd.read_csv("train.csv")

# Data Preprocessing (Matching bigmart_sales_prediction.py logic)
# 1. Handle Item_Fat_Content
fat = {"Low Fat":0, "Regular":1, "low fat":0, "LF":0, "reg":1}
df['Item_Fat_Content'] = df['Item_Fat_Content'].apply(lambda x: fat[x])

# 2. Handle Item_Type
itemtype = {'Baking Goods':0, 'Breads':1, 'Breakfast':2, 'Canned':3, 'Dairy':4,
            'Frozen Foods':5, 'Fruits and Vegetables':6, 'Hard Drinks':7,
            'Health and Hygiene':12, 'Household':11, 'Meat':10, 'Others':9, 'Seafood':8,
            'Snack Foods':13, 'Soft Drinks':14, 'Starchy Foods':15}
df['Item_Type'] = df['Item_Type'].apply(lambda x: itemtype[x])

# 3. Handle Outlet_Location_Type
tier = {'Tier 1':0, 'Tier 2':1, 'Tier 3':2}
df['Outlet_Location_Type'] = df['Outlet_Location_Type'].apply(lambda x: tier[x])

# 4. Handle Outlet_Type
market_type = {'Grocery Store':0, 'Supermarket Type1':1, 'Supermarket Type2':2,
               'Supermarket Type3':3}
df['Outlet_Type'] = df['Outlet_Type'].apply(lambda x: market_type[x])

# 5. Handle Outlet_Age (assuming 2021 as in original script)
df["Age_Outlet"] = 2021 - df["Outlet_Establishment_Year"]

# Select features used in app.py: [Fat, Visibility, Item_type, Price, Location, Outlet_type, Age]
features = ['Item_Fat_Content', 'Item_Visibility', 'Item_Type', 'Item_MRP', 
            'Outlet_Location_Type', 'Outlet_Type', 'Age_Outlet']
X = df[features]
y = df['Item_Outlet_Sales']

# The original script used XGBRFRegressor (seen in the pickle.dump call)
# and a specific train/test split.
model = XGBRFRegressor(n_jobs=-1, n_estimators=1000, max_depth=5)
model.fit(X, y)

# Save the model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model retrained successfully and saved to model.pkl")
print(f"Features used: {features}")
