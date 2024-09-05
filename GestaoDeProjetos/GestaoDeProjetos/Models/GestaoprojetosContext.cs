using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Models;

public partial class GestaoprojetosContext : DbContext
{
    public GestaoprojetosContext()
    {
    }

    public GestaoprojetosContext(DbContextOptions<GestaoprojetosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Avaliaco> Avaliacoes { get; set; }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<Evento> Eventos { get; set; }

    public virtual DbSet<Localidade> Localidades { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Avaliaco>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("avaliacoes");

            entity.HasIndex(e => e.EventoId, "evento_id");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Comentario)
                .HasColumnType("text")
                .HasColumnName("comentario");
            entity.Property(e => e.DataAvaliacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("data_avaliacao");
            entity.Property(e => e.EventoId).HasColumnName("evento_id");
            entity.Property(e => e.Nota).HasColumnName("nota");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Evento).WithMany(p => p.Avaliacos)
                .HasForeignKey(d => d.EventoId)
                .HasConstraintName("avaliacoes_ibfk_1");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Avaliacos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("avaliacoes_ibfk_2");
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("categorias");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .HasColumnName("nome");
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("eventos");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Capacidade).HasColumnName("capacidade");
            entity.Property(e => e.Data)
                .HasColumnType("date")
                .HasColumnName("data");
            entity.Property(e => e.DataCriacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("data_criacao");
            entity.Property(e => e.Descricao)
                .HasColumnType("text")
                .HasColumnName("descricao");
            entity.Property(e => e.Hora)
                .HasColumnType("time")
                .HasColumnName("hora");
            entity.Property(e => e.Local)
                .HasMaxLength(255)
                .HasColumnName("local");
            entity.Property(e => e.TipoEvento)
                .HasMaxLength(100)
                .HasColumnName("tipo_evento");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .HasColumnName("titulo");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Eventos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("eventos_ibfk_1");

            entity.HasMany(d => d.Categoria).WithMany(p => p.Eventos)
                .UsingEntity<Dictionary<string, object>>(
                    "EventosCategoria",
                    r => r.HasOne<Categoria>().WithMany()
                        .HasForeignKey("CategoriaId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("eventos_categorias_ibfk_2"),
                    l => l.HasOne<Evento>().WithMany()
                        .HasForeignKey("EventoId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("eventos_categorias_ibfk_1"),
                    j =>
                    {
                        j.HasKey("EventoId", "CategoriaId").HasName("PRIMARY");
                        j.ToTable("eventos_categorias");
                        j.HasIndex(new[] { "CategoriaId" }, "categoria_id");
                        j.IndexerProperty<int>("EventoId").HasColumnName("evento_id");
                        j.IndexerProperty<int>("CategoriaId").HasColumnName("categoria_id");
                    });
        });

        modelBuilder.Entity<Localidade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("localidades");

            entity.HasIndex(e => e.EventoId, "evento_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cep)
                .HasMaxLength(20)
                .HasColumnName("cep");
            entity.Property(e => e.Cidade)
                .HasMaxLength(100)
                .HasColumnName("cidade");
            entity.Property(e => e.Endereco)
                .HasMaxLength(255)
                .HasColumnName("endereco");
            entity.Property(e => e.Estado)
                .HasMaxLength(100)
                .HasColumnName("estado");
            entity.Property(e => e.EventoId).HasColumnName("evento_id");

            entity.HasOne(d => d.Evento).WithMany(p => p.Localidades)
                .HasForeignKey(d => d.EventoId)
                .HasConstraintName("localidades_ibfk_1");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tickets");

            entity.HasIndex(e => e.CodigoQr, "codigo_qr").IsUnique();

            entity.HasIndex(e => e.EventoId, "evento_id");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CodigoQr).HasColumnName("codigo_qr");
            entity.Property(e => e.DataCompra)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("data_compra");
            entity.Property(e => e.EventoId).HasColumnName("evento_id");
            entity.Property(e => e.Lote).HasColumnName("lote");
            entity.Property(e => e.Preco)
                .HasPrecision(10)
                .HasColumnName("preco");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Evento).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.EventoId)
                .HasConstraintName("tickets_ibfk_1");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("tickets_ibfk_2");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataCriacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("data_criacao");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .HasColumnName("senha");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
