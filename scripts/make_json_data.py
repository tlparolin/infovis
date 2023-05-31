import pandas as pd

# montagem do dataframe para produção de plástico POR TIPO (PRIMÁRIO/SECUNDÁRIO)
# lê o arquivo csv
df0 = pd.read_csv('data/csv/global-plastics-prod-by-type.csv')
# retira o 'Total' da coluna 'type_of_plastic', para deixar somente os tipos
df0.drop(df0[df0.type_of_plastic == 'Total'].index, inplace=True)
# altera a ordem das colunas
df0 = df0.reindex(columns=['type_of_plastic', 'year', 'value'])
# altera o nome das colunas para padronizar em 'source', 'target', e 'value'
df0.rename(columns={'type_of_plastic': 'from', 'year': 'to', 'value': 'weight'}, inplace=True)
# deixa como inteiro a coluna target (anos)
df0['to'] = df0['to'].astype('int')
# salva um json
df0.to_json('data/json/prod_by_type.json', orient='records')
# agrupa por década
group = df0['to']//10*10  # como décadas
df0 = df0.groupby([group, 'from']).weight.sum().reset_index(name="weight")
# salva json por década
df0.to_json('data/json/prod_by_type_decade.json', orient='records')


# montagem do dataframe para consumo por polímero
df1 = pd.read_csv('data/csv/global-plastics-prod-by-polymer.csv')
# muda o modo da tabela de wide para long
df1 = df1.melt(id_vars=["polymer"], var_name="year", value_name="value")
# agrupa por tipo de polímero e depois por ano
df1 = df1.groupby(['polymer', 'year']).value.sum().reset_index(name="value")
# retira o 'Total' da coluna 'polymer'
df1.drop(df1[df1.polymer == 'Total'].index, inplace=True)
# renomeia as colunas para 'source', 'target', 'value'
df1.rename(columns={'polymer': 'from', 'year': 'to', 'value': 'weight'}, inplace=True)
# renomeia 'Other' para 'Other Polymers'
df1.loc[df1.to.isin(['Other']), 'to'] = 'Other Polymers'
# deixa como inteiro a coluna target (anos)
df1['to'] = df1['to'].astype('int')
# salva um json
df1.to_json('data/json/prod_by_polymer.json', orient='records')
# agrupa por década
group = df1['to']//10*10  # como décadas
df1 = df1.groupby([group, 'from']).weight.sum().reset_index(name="weight")
# salva json por década
df1.to_json('data/json/prod_by_polymer_decade.json', orient='records')


# montagem do dataframe para consumo por aplicação
df2 = pd.read_csv('data/csv/global-plastics-prod-by-application.csv')
# muda o modo da tabela de wide para long
df2 = df2.melt(id_vars=["plastics_applications"], var_name="year", value_name="value")
# retira o 'Total' da coluna 'plastics_applications'
df2.drop(df2[df2.plastics_applications == 'Total'].index, inplace=True)
# renomeia as colunas para 'source', 'target', 'value'
df2.rename(columns={'plastics_applications': 'source', 'year': 'target'}, inplace=True)
# renomeia 'Other', 'Marine Coatings' e 'Road Marking' para incluir 'Applications'
df2.loc[df2.target.isin(['Other']), 'target'] = 'Other Applications'
df2.loc[df2.target.isin(['Marine coatings']), 'target'] = 'Marine Coatings Applications'
df2.loc[df2.target.isin(['Road marking']), 'target'] = 'Road Marking Applications'
# salva um json
df2.to_json('data/json/prod_by_application.json', orient='records')
# agrupa por década
group = df1['target']//10*10  # como décadas
df2 = df2.groupby([group, 'source']).value.sum().reset_index(name="value")
# salva json por década
df2.to_json('data/json/prod_by_application_decade.json', orient='records')


# montagem o dataframe PRINCIPAL
df = pd.concat([df0, df1, df2], axis=0)

# resetar o index do dataframe que fica repetido ao fazer a concatenação (deleta e recria)
df.reset_index(drop=True, inplace=True)


# salva o dataframe no arquivo em formato json
df.to_json('data/json/dados.json', orient='records')


# agrupar os dados em décadas para o gráfico não ficar muito pesado
df['target'] = df['target'].astype('int')
group = df['target']//10*10  # como décadas
df = df.groupby([group, 'source']).value.sum().reset_index(name="value")

# altera a ordem das colunas
df = df.reindex(columns=['source', 'target', 'value'])

# salva o dataframe no arquivo em formato json
df.to_json('data/json/dados_por_decadas.json', orient='records')
