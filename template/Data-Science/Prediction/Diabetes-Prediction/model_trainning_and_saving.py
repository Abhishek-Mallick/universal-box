import numpy as np
import pandas as pd
import pickle
from scipy import stats
from imblearn.over_sampling import SMOTE
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier,AdaBoostClassifier,GradientBoostingClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import warnings
warnings.filterwarnings('ignore')

df = pd.read_csv('diabetes.csv')

# handling outliers
z_scores = np.abs(stats.zscore(df.select_dtypes(include = [np.number])))
df = df[(z_scores < 3).all(axis = 1)]

df = df.drop_duplicates()

# replacing zero value
df['Glucose'] = df['Glucose'].replace(0,df['Glucose'].median())
df['BloodPressure'] = df['BloodPressure'].replace(0,df['BloodPressure'].median())
df['BMI'] = df['BMI'].replace(0,df['BMI'].median())
df['SkinThickness'] = df['SkinThickness'].replace(0,df['SkinThickness'].median())
df['Insulin'] = df['Insulin'].replace(0,df['Insulin'].median())
df['Age'] = df['Age'].replace(0,df['Age'].median())

# divide the dataset into independent and dependent dataset
X = df.drop(columns='Outcome')
y = df['Outcome']

# handling imbalance data 
smote = SMOTE()
X, y = smote.fit_resample(X, y)

data_columns = X.columns

numerical_pipeline = Pipeline(
        steps = [
            ('imputer',SimpleImputer(strategy = 'median')),
            ('scaler',StandardScaler())
        ]
)

preprocessor = ColumnTransformer([
    ('numerical_pipeline',numerical_pipeline,data_columns)
])

# splitting the data 
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.30,random_state = 20)

X_train = preprocessor.fit_transform(X_train)
X_test = preprocessor.transform(X_test)

models = {
    'LogisticRegression':LogisticRegression(n_jobs = -1,random_state = 20),
    'RandomForestClassifier':RandomForestClassifier(oob_score = True,n_jobs = -1,random_state = 20),
    'AdaBoostClassifier':AdaBoostClassifier(random_state = 20),
    'GradientBoostingClassifier': GradientBoostingClassifier(random_state = 20),
    'XGBClassifier':XGBClassifier()
}

def model_evaluation(X_train,X_test,y_train,y_test,models):
    reports = {}

    for model_name,model in models.items():
        model.fit(X_train,y_train)
        y_test_pred = model.predict(X_test)

        accuracyScore = accuracy_score(y_test,y_test_pred)
        confusionMatrix = confusion_matrix(y_test,y_test_pred)
        classificationReport = classification_report(y_test,y_test_pred)

        reports[model_name] = [
            accuracyScore,
            confusionMatrix,
            classificationReport
        ]

    return reports

reports = model_evaluation(X_train,X_test,y_train,y_test,models)
for model_name,model_data in reports.items():
    print(f'Model : {model_name}')
    print(f'Accuracy score : {model_data[0]}')
    print(f'Confusion Matrix : \n{model_data[1]}')
    print(f'Classification Report : \n{model_data[2]}')



model_objects = {
    'preprocessor': preprocessor,
    'models': models
}

file = open('model_objects.pkl','wb')
pickle.dump(model_objects,file)

print("Model object saved in model_objects.pkl")

