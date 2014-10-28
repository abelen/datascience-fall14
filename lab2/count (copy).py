import avro
import avro.schema
import pandas as pd
from avro.io import DatumReader, DatumWriter
from avro.datafile import DataFileReader

# grab the schema from the avro file,
# and the records from the countries.avro file
schema = avro.schema.parse(open("country.avsc").read())
reader = DataFileReader(open("countries.avro", "r"), DatumReader());
records = []

# append all the records from the schema into the list of records
for u in reader:
    records.append(u)

# get the records that have population above 1000000
df = pd.DataFrame.from_records(records)
df = df[df['population'] > 10000000]
print df['name'].count()

reader.close()
