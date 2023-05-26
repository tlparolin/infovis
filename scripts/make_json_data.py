import pandas as pd

# montagem do dataframe para produção de plástico por tipo
# lê o arquivo csv
df0 = pd.read_csv('../data/csv/global-plastics-prod-by-type.csv')
# retira o 'Total' da coluna 'type_of_plastic', para deixar somente os tipos
df0.drop(df0[df0.type_of_plastic == 'Total'].index, inplace=True)
# altera a ordem das colunas
df0 = df0.reindex(columns=['type_of_plastic', 'year', 'value'])
# altera o nome das colunas para padronizar em 'source', 'target', e 'value'
df0.rename(columns={'type_of_plastic': 'source', 'year': 'target'}, inplace=True)

# montagem do dataframe para consumo por polímero
df1 = pd.read_csv('../data/csv/global-plastics-prod-by-polymer.csv')
# muda o modo da tabela de wide para long
df1 = df1.melt(id_vars=["polymer"], var_name="year", value_name="value")
# agrupa por tipo de polímero e depois por ano
df1 = df1.groupby(['polymer', 'year']).value.sum().reset_index(name="value")
# retira o 'Total' da coluna 'polymer'
df1.drop(df1[df1.polymer == 'Total'].index, inplace=True)
# renomeia as colunas para 'source', 'target', 'value'
df1.rename(columns={'polymer': 'source', 'year': 'target'}, inplace=True)
# renomeia 'Other' para 'Other Polymers'
df1.loc[df1.target.isin(['Other']), 'target'] = 'Other Polymers'

# montagem do dataframe para consumo por aplicação
df2 = pd.read_csv('../data/csv/global-plastics-prod-by-application.csv')
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

# montagem o dataframe PRINCIPAL
df = pd.concat([df0, df1, df2], axis=0)

# resetar o index do dataframe que fica repetido ao fazer a concatenação (deleta e recria)
df.reset_index(drop=True, inplace=True)


# salva o dataframe no arquivo em formato json
df.to_json('../data/json/dados.json', orient='records')


# agrupar os dados em décadas para o gráfico não ficar muito pesado
df['target'] = df['target'].astype('int')
group = df['target']//10*10 # como décadas
df = df.groupby([group, 'source']).value.sum().reset_index(name="value")

# altera a ordem das colunas
df = df.reindex(columns=['source', 'target', 'value'])

# salva o dataframe no arquivo em formato json
df.to_json('../data/json/dados_por_decadas.json', orient='records')
