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
# monta por década
group = df1['year']//10*10  # como décadas
df1 = df1.groupby([group, 'type_of_plastic']).value.sum().reset_index(name="value")
df1.to_json('../data/json/global-plastics-prod-by-type-decade.json', orient='records')


# para que usamos todo esse plástico
df2 = pd.read_csv('../data/csv/global-plastics-prod-by-application.csv')
# muda o modo da tabela de wide para long
df2 = df2.melt(id_vars=["plastics_applications"], var_name="year", value_name="value")
# retira o 'Total' da coluna 'plastics_applications'
df2.drop(df2[df2.plastics_applications == 'Total'].index, inplace=True)
# renomeia 'Other', 'Marine Coatings' e 'Road Marking' para incluir 'Applications'
df2.loc[df2['plastics_applications'] == 'Other', 'plastics_applications'] = 'Other Applications'
df2.loc[df2['plastics_applications'] == 'Marine coatings', 'plastics_applications'] = 'Marine Coatings Applications'
df2.loc[df2['plastics_applications'] == 'Road marking', 'plastics_applications'] = 'Road Marking Applications'
# deixa como inteiro a coluna to (anos)
df2['year'] = df2['year'].astype('int')
# agrupa por década
group2 = df2['year']//10*10  # como décadas
df2 = df2.groupby([group2, 'plastics_applications']).value.sum().reset_index(name="value")
# calcula porcentagem, primeiro cria um dataframe para cada decada e depois faz a soma e porcentagem
# por fim une os dataframes em um só
# eu não sei fazer de outro jeito :(
df21 = df2.loc[(df2['year'] == 1990), ['plastics_applications', 'year', 'value']]
df22 = df2.loc[(df2['year'] == 2000), ['plastics_applications', 'year', 'value']]
df23 = df2.loc[(df2['year'] == 2010), ['plastics_applications', 'year', 'value']]

df21['percent'] = (df21['value'] / df21['value'].sum()) * 100
df22['percent'] = (df22['value'] / df22['value'].sum()) * 100
df23['percent'] = (df23['value'] / df23['value'].sum()) * 100

df2_final = pd.concat([df21, df22, df23], axis=0)
# salva
df2_final.to_json('../data/json/global-plastics-prod-by-application-dec.json', orient='records')


# consumo por país
df4 = pd.read_csv('../data/csv/global-plastics-prod-by-region.csv')
# apaga coluna group e subgroup que não iremos utilizar
df4 = df4.drop('group', axis=1)
df4 = df4.drop('subgroup', axis=1)
# wide to long
df4 = df4.melt(id_vars=["country"], var_name="year", value_name="value")
# deixa como inteiro a coluna to (anos)
df4['year'] = df4['year'].astype('int')
# agrupa por década
group4 = df4['year']//10*10  # como décadas
df4 = df4.groupby([group4, 'country']).value.sum().reset_index(name="value")
# calcula porcentagem, primeiro cria um dataframe para cada decada e depois faz a soma e porcentagem
# por fim une os dataframes em um só
# eu não sei fazer de outro jeito :(
df41 = df4.loc[(df4['year'] == 1990), ['year', 'country', 'value']]
df42 = df4.loc[(df4['year'] == 2000), ['year', 'country', 'value']]
df43 = df4.loc[(df4['year'] == 2010), ['year', 'country', 'value']]

df41['percent'] = (df41['value'] / df41['value'].sum()) * 100
df42['percent'] = (df42['value'] / df42['value'].sum()) * 100
df43['percent'] = (df43['value'] / df43['value'].sum()) * 100

df4_final = pd.concat([df41, df42, df43], axis=0)
# salva
df4_final.to_json('../data/json/global-plastics-prod-by-region-dec.json', orient='records')


# montagem dataframe descarte por país/região - Total
df5 = pd.read_csv('../data/csv/plastic-waste-by-region-and-end-of-life-fate-Total.csv')
# apaga coluna group e subgroup que não iremos utilizar
df5 = df5.drop('group', axis=1)
df5 = df5.drop('subgroup', axis=1)
# wide to long
df5 = df5.melt(id_vars=["country"], var_name="year", value_name="value")
# limpa registro sem valor numérico pois tem coluna com valor= '..'
df5.drop(df5[df5.value == '..'].index, inplace=True)
# coloca número como número porque são números né ;)
df5['year'] = df5['year'].astype('int')
df5['value'] = df5['value'].astype('float')
# ordena por valor, crescente
df5.sort_values(by=['value'], ascending=True)
df5.to_json('../data/json/global-waste-by-region-and-end-of-life-fate-Total.json', orient='records')
# agrupa por década
group5 = df5['year']//10*10  # como décadas
df5 = df5.groupby(['country', group5]).value.sum().reset_index(name="value")
df5.to_json('../data/json/global-waste-by-region-and-end-of-life-fate-Total-dec.json', orient='records')


# montagem dataframe para tipos de descarte de plástico
df6 = pd.read_csv('../data/csv/plastic-waste-by-region-and-end-of-life-fate-All.csv')
# apaga coluna group e subgroup que não iremos utilizar
df6 = df6.drop('group', axis=1)
df6 = df6.drop('subgroup', axis=1)
df6 = df6.drop('country', axis=1)
# remove espaços dos nomes das colunas, trocando por _
df6.columns = df6.columns.str.replace(" ", "_")
# retira o total da coluna waste_type
df6.drop(df6[df6.waste_type == 'Total'].index, inplace=True)
# muda a tabela de wide para long
df6 = df6.melt(id_vars=["waste_type"], var_name="year", value_name="value")
# limpa registro sem valor numérico pois tem coluna com valor= '..'
df6.drop(df6[df6.value == '..'].index, inplace=True)
# acerta o tipo da coluna para não dar erro
df6['year'] = df6['year'].astype('int')
df6['value'] = df6['value'].astype('float')
# agrupar por tipo de lixo
df6 = df6.groupby(['waste_type', 'year'])['value'].sum().reset_index()
df6.to_json('../data/json/global-waste-by-region-and-end-of-life-fate-All.json', orient='records')
group6 = df6['year']//10*10  # como décadas
df6 = df6.groupby(['waste_type', group6]).value.sum().reset_index(name="value")
# troca os valores de ano para funcionar com o gráfico dumbbell (haltere)
df6.loc[df6['year'] == 2000, 'year'] = 'low'
df6.loc[df6['year'] == 2010, 'year'] = 'high'
df6.rename(columns={'waste_type': 'name'}, inplace=True)
df6 = pd.pivot(df6, index=['name'], columns='year', values='value').reset_index()
df6.to_json('../data/json/global-waste-by-region-and-end-of-life-fate-All-dec.json', orient='records')

