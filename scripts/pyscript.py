# coding: utf-8
import csv

## SCRIPT PARA GERAR MATRICULAS (ID) DE ALUNOS FOMADOS COM MENOR DISTANCIA ENTRE ELAS
## esse script deve ser rodado no csv 'matches.csv' da pasta scripts em avaliaGradeCC

ids = {}
new_id = 0
matrix = []

first = True

with open('matches.csv', 'rb') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=',')
	for row in spamreader:
		
		if not first:
			matrix.append(row)
		else:
			first = False
		
		
for i in range(len(matrix)):
	mat = matrix[i][0]
	if mat not in ids:
		new_id += 5
		ids[mat] = new_id
	matrix[i][0] = ids[mat]
		
			
with open('../data.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(["mat","periodo","freq","semestre"])
    
    for i in range(len(matrix)):

		my_mat = matrix[i][0]
		my_per = matrix[i][1]
		my_freq = matrix[i][2]
		my_sem = matrix[i][3]
        
		spamwriter.writerow([my_mat, my_per, my_freq, my_sem])

