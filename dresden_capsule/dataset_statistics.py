import argparse
import glob
import os

import pandas as pd 

def read_csv_files(path):
    # Get a list of all the csv files
    csv_files = glob.glob(os.path.join(path, '*.csv'))

    # Create a list to hold the individual dataframes
    dfs = []

    # Loop through the files and read each one into a dataframe
    for csv_file in csv_files:
        df = pd.read_csv(csv_file)
        dfs.append(df)

    # Concatenate all the dataframes into one
    combined_df = pd.concat(dfs, ignore_index=True)

    return combined_df

def main(args):
    df = read_csv_files(args.path)

    # Show all the column names
    print(df.columns)
    
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('path', type=str, help='path to csv files')
    args = parser.parse_args()
    main(args)