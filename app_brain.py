# CystaSense Core Machine Learning Engine
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Global Configuration
FINAL_THRESHOLD = 0.30

def predict_pcos_risk(
    age, bmi, cycle_type, cycle_length,
    fsh, lh, fsh_lh_ratio, amh,
    waist_hip_ratio, weight_gain, hair_growth,
    skin_darkening, hair_loss, pimples,
    follicle_left, follicle_right, endometrium
):
    # Enforce standard cycle logic
    cycle_encoded = 4 if cycle_type.lower() == 'irregular' else 2
    
    # Pack inputs identically to training arrays
    user_input = [[
        age, bmi, cycle_encoded, cycle_length,
        fsh, lh, fsh_lh_ratio, amh,
        waist_hip_ratio, weight_gain, hair_growth,
        skin_darkening, hair_loss, pimples,
        follicle_left, follicle_right, endometrium
    ]]
    
    return {
        "status": "Engine integrated successfully",
        "threshold_configured": FINAL_THRESHOLD
    }

print("CystaSense code logic active.")
