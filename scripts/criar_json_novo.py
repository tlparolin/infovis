import pandas as pd

# montagem do dataframe para produção de plástico global por ano desde 1950
# lê o arquivo csv
df0 = pd.read_csv('../data/csv/global-plastics-production.csv')
# retira a coluna 'code'
df0 = df0.drop(columns=['code'])
# deixa como inteiro a coluna ano
df0['year'] = df0['year'].astype('int')
# salva um json
df0.to_json('../data/json/global-plastics-production.json', orient='records')

# produção por tipo
df1 = pd.read_csv('../data/csv/global-plastics-prod-by-type.csv')
df1['year'] = df1['year'].astype('int')
df1.to_json('../data/json/global-plastics-prod-by-type.json', orient='records')
