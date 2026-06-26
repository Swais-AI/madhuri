
import psycopg2
conn = psycopg2.connect(
    host="swais-db-test-env.cri2kcc26kxg.ap-south-2.rds.amazonaws.com",
    port=5432,
    database="sgs_prod",
    user="swais_app_user",
    password="Swaisuser007",
    sslmode="require"
)
print("✅ Connected successfully!")
