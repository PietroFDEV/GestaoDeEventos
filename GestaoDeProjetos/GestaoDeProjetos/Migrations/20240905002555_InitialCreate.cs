using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace GestaoDeProjetos.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "categorias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    senha = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    data_criacao = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "eventos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    titulo = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: true),
                    data = table.Column<DateTime>(type: "date", nullable: false),
                    hora = table.Column<TimeSpan>(type: "time", nullable: false),
                    local = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    tipo_evento = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    capacidade = table.Column<int>(type: "int", nullable: true),
                    usuario_id = table.Column<int>(type: "int", nullable: true),
                    preco = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    data_criacao = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "eventos_ibfk_1",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "avaliacoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    evento_id = table.Column<int>(type: "int", nullable: true),
                    usuario_id = table.Column<int>(type: "int", nullable: true),
                    nota = table.Column<int>(type: "int", nullable: true),
                    comentario = table.Column<string>(type: "text", nullable: true),
                    data_avaliacao = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "avaliacoes_ibfk_1",
                        column: x => x.evento_id,
                        principalTable: "eventos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "avaliacoes_ibfk_2",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "localidades",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    evento_id = table.Column<int>(type: "int", nullable: true),
                    endereco = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    cidade = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    estado = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    cep = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "localidades_ibfk_1",
                        column: x => x.evento_id,
                        principalTable: "eventos",
                        principalColumn: "id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tickets",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    evento_id = table.Column<int>(type: "int", nullable: true),
                    usuario_id = table.Column<int>(type: "int", nullable: true),
                    codigo_qr = table.Column<string>(type: "varchar(255)", nullable: true),
                    lote = table.Column<int>(type: "int", nullable: true),
                    preco = table.Column<decimal>(type: "decimal(10,2)", precision: 10, nullable: true),
                    data_compra = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "tickets_ibfk_1",
                        column: x => x.evento_id,
                        principalTable: "eventos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "tickets_ibfk_2",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "evento_id",
                table: "avaliacoes",
                column: "evento_id");

            migrationBuilder.CreateIndex(
                name: "usuario_id",
                table: "avaliacoes",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "usuario_id1",
                table: "eventos",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "categoria_id",
                table: "eventos_categorias",
                column: "categoria_id");

            migrationBuilder.CreateIndex(
                name: "evento_id1",
                table: "localidades",
                column: "evento_id");

            migrationBuilder.CreateIndex(
                name: "codigo_qr",
                table: "tickets",
                column: "codigo_qr",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "evento_id2",
                table: "tickets",
                column: "evento_id");

            migrationBuilder.CreateIndex(
                name: "usuario_id2",
                table: "tickets",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "email",
                table: "usuarios",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "avaliacoes");

            migrationBuilder.DropTable(
                name: "eventos_categorias");

            migrationBuilder.DropTable(
                name: "localidades");

            migrationBuilder.DropTable(
                name: "tickets");

            migrationBuilder.DropTable(
                name: "categorias");

            migrationBuilder.DropTable(
                name: "eventos");

            migrationBuilder.DropTable(
                name: "usuarios");
        }
    }
}
