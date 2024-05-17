import numpy as np
import pickle
import json

__locations = None
__data_col = None
__model = None

def get_prediction(location, sqft, bhk, bath):
    try:
        loc_index = __data_col.index(location)
    except:
        loc_index = -1
    
    x = np.zeros(len(__data_col))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)


def get_loc_names():
    load_artifacts()

    return __locations

def load_artifacts():
    print('Loading saved artifacts')
    global __data_col
    global __locations
    global __model

    with open("artifacts/columns.json", 'r') as f:
        # json.load(f) gives a dictionary from a json file
        __data_col = json.load(f)['data_columns']
        __locations = __data_col[3::]
    
    with open("artifacts/bengaluru_house_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    
    print('Loading arrifacts finished')

if __name__ == '__main__':
    load_artifacts()
    # print(get_loc_names())
    print(get_prediction('1st Phase JP Nagar', 1000, 3, 3))
    print(get_prediction('1st Phase JP Nagar', 1000, 2, 2))
    print(get_prediction('Ejipura', 1000, 2, 2))    # other location